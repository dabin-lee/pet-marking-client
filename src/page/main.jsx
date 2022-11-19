/* global kakao*/
import React, { useRef, useEffect, useState } from 'react'
import { Grid, GridItem, Box, useDisclosure } from '@chakra-ui/react'

// components
import Header from '../component/header'
import Bookmark from '../component/Bookmark'
import StoreList from '../component/StoreList'
import ItemModal from '../modal/Modal'
import TestBox from '../component/TestBox'
import { useMemo } from 'react'

const Main = () => {

    const [search, setSearch] = useState('이태원 맛집')
    const [map, setMap] = useState(null)
    const [placesList, setPlacesList] = useState([]) //키워드 검색 후 목록
    const [markers, setMarkers] = useState([]) // 마커를 담을 배열입니다

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalItem, setModalItem] = useState({})

    const [mustgo, setMustgo] = useState(false) //검색이 완료되면 true (storeList에서 사용)
    // const [bookmark, setBookmark] = useState(false)

    const overlayRef = useRef(null)
    const mapElement = useRef(null) //지도영역
    const searchInput = useRef(null)
    // const placeElem = useRef(null)

    useEffect(() => {
        searchInput.current.focus()
        if (!map) {
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(37.566826, 126.9786567), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };

            const newMap = new window.kakao.maps.Map(mapElement.current, options) //지도 생성 및 객체 리턴
            setMap(newMap)
        }
        // 키워드로 장소를 검색합니다
        // searchPlace();
    }, [])

    // usestate값이 변경되고 나서 동작을 해야한다면 별도로 useEffect만들어서 해야해 ★
    useEffect(() => {
        // 키워드로 장소를 검색합니다
        if (map) searchPlace();
    }, [map]) //map이 있으면 실행 

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    const chgSearch = (e) => setSearch(e.target.value)


    // 키워드 검색을 요청하는 함수입니다
    const searchPlace = () => {

        let keyword = search

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            console.log('키워드를 입력해주세요!');
            return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status, pagination) => {

        if (status === kakao.maps.services.Status.ZERO_RESULT) return alert('검색 결과가 존재하지 않습니다.');
        if (status === kakao.maps.services.Status.ERROR) return alert('검색 결과 중 오류가 발생했습니다.');

        if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 검색완료 된 data 전달
            setPlacesList(data)
            setMustgo(true)
        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
        console.log('places: ', places);

        // var listEl = placeElem.current,
        const bounds = new kakao.maps.LatLngBounds()

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        // removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        places.map((place, i) => {
            // console.log('place: ', place);
            // 마커를 생성하고 지도에 표시합니다
            const placePosition = new kakao.maps.LatLng(place.y, place.x)
            const marker = addMarker(placePosition, i);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            kakao.maps.event.addListener(marker, 'click', makeMarkerClickListener(marker, place));
        })

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }

    function makeMarkerClickListener(marker, place) {
        return () => {
            let content = getOverlayContent(place)
            let customOverlay = new kakao.maps.CustomOverlay({
                content: content,
                map: map,
                position: marker.getPosition()
            });

            overlayRef.current = customOverlay
        }
    }

    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    const closeOverlay = () => overlayRef.current.setMap(null)

    /* overlay를 구성하는 content */
    const getOverlayContent = (place) => {
        const content = document.createElement('div');
        content.setAttribute('class', 'wrap kakaoInforwindow');
        content.innerHTML = `
            <div class="wrap">
                <div class="info">
                    <div class="title">
                        ${place?.place_name}
                        <div id="close-btn" class="close" title="닫기"></div>
                    </div>
                    <div class="body" id="info">
                        <div class="img">
                            <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">
                        </div>
                        <div class="desc">
                            <div class="ellipsis">${place?.road_address_name ?? place?.address_name}</div>
                            <div class="jibun ellipsis">${place?.phone}</div>
                            <div><a href="${place?.place_url}" target="_blank" class="link">상세정보</a></div>
                        </div>
                    </div>
                </div>
            </div>
        `
        const closeBtn = content.querySelector('#close-btn')
        const itemInfo = content.querySelector('#info')
        closeBtn.onclick = () => closeOverlay()
        itemInfo.onclick = () => itemOpenModal(place)
        return content;
    };



    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png' // 마커 이미지 url, 스프라이트 이미지를 씁니다
        const imageSize = new kakao.maps.Size(36, 37)  // 마커 이미지의 크기
        const imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        }
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
        const marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        setMarkers([...markers, marker])

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    const removeMarker = () => {
        markers.map(marker => marker.setMap(null))
        setMarkers([])
    }


    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    }

    // 모달 오픈 
    const itemOpenModal = (place) => {
        onOpen()
        setModalItem(place)
        closeOverlay()
    }

    const memoStore = useMemo(
        () => { return <StoreList placesList={placesList} mustgo={mustgo} /> },
        [placesList, mustgo]
    )





    return (

        <main>
            <Header
                search={search}
                chgSearch={chgSearch}
                searchInput={searchInput}
                searchPlace={searchPlace}
            />

            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={3}
                p={3}>

                <GridItem rowSpan={1} colSpan={1} borderRadius="15" h={500}>
                    <div ref={mapElement} style={{ minHeight: '500px' }}></div>
                </GridItem>

                <GridItem>
                    <Bookmark />
                </GridItem>
            </Grid >

            {memoStore}

            <ItemModal isOpen={isOpen} onClose={onClose} modalItem={modalItem} />
        </main >
    )
}

export default Main