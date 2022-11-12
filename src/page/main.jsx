/* global kakao*/
import React, { useRef, useEffect, useState } from 'react'
import Header from '../component/header'
import Bookmark from '../component/Bookmark'
import { Grid, GridItem, Box } from '@chakra-ui/react'

// components
import StoreList from '../component/StoreList'
import Categories from '../component/Categories'
import axios from 'axios'

// function Placeinfo(place) {
//     this.id = place.id
//     this.name = place.place_name
//     this.address = place.road_address_name
//     this.phone = place.phone;
//     this.place = place
// }

// Placeinfo.prototype.saveToServer = async function () {
//     const res = await axios.post('jsidofjidsof', this.place)
//     console.log('res: ', res);
// }


// class PlaceInfo {

//     place

//     constructor(place) {
//         this.place = place
//     }

//     async saveToServer() {
//         const res = await axios.post('jsidofjidsof', this.place)
//         console.log('res: ', res);
//     }
// }






function Main() {

    const [search, setSearch] = useState('이태원 맛집')
    const [map, setMap] = useState(null)
    const [overlay, setOverlay] = useState(null)
    const [placesList, setPlacesList] = useState([]) //키워드 검색 후 목록

    // const [bookmark, setBookmark] = useState(false)

    useEffect(() => {
        console.log('overlay: ', overlay);
        console.log('overlay.setMap: ', overlay?.setMap);
    }, [overlay])

    const chgSearch = (e) => {
        setSearch(e.target.value)
    }
    const mapElement = useRef(null) //지도영역
    const searchInput = useRef(null)
    const placeElem = useRef(null)

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
        searchPlace();
    }, [])
    // 마커를 담을 배열입니다
    var markers = [];

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlace() {

        var keyword = search

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            console.log('키워드를 입력해주세요!');
            return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 검색완료 된 data 전달
            setPlacesList(data)

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {

        var listEl = placeElem.current,
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        // 인포윈도우를 생성합니다
        // let infowindow = new kakao.maps.InfoWindow({
        //     zIndex: 1,
        //     removable: true
        // });


        for (var i = 0; i < places.length; i++) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i);
            // itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);





            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            kakao.maps.event.addListener(marker, 'click', makeMarkerClickListener(marker));

            function makeMarkerClickListener(marker) {
                return function () {
                    let content = getOverlayContent()
                    let customOverlay = new kakao.maps.CustomOverlay({
                        content: content,
                        map: map,
                        position: marker.getPosition()
                    });
                    setOverlay(customOverlay)
                }
            }

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }

    /* overlay를 구성하는 content */
    const getOverlayContent = () => {
        const content = document.createElement('div');
        content.setAttribute('class', 'wrap kakaoInforwindow');
        // content.innerHTML = `<div class="info">
        //     <div class="title">
        //         카카오 스페이스닷원
        //     </div>
        //     <div class="body">
        //         <div class="desc">
        //             <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
        //             <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
        //             <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
        //         </div>
        //     </div>
        // </div>`;

        const infoDiv = document.createElement('div')
        infoDiv.setAttribute('class', 'info')
        infoDiv.innerHTML = `
            <div class="body">
                <div class="desc">
                    <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                    <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                    <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
                </div>
            </div>
        `




        const closeBtn = document.createElement('div');
        closeBtn.setAttribute('class', 'close')
        closeBtn.setAttribute('title', '닫기');
        closeBtn.style = 'z-index: 999999'
        closeBtn.onclick = () => closeOverlay();

        // content.appendChild(closeBtn);
        infoDiv.prepend(closeBtn)
        content.appendChild(infoDiv)
        return content;
    };



    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions = {
                spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // 마커 클릭 이벤트
    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    // var iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다



    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다



    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    function closeOverlay() {
        console.log('overlay: ', overlay);
        overlay.setMap(null);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    }








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
                templateRows="repeat(2, 1fr)"
                gap={3}
                p={3}>

                <GridItem rowSpan={2} colSpan={1} borderRadius="15" h={500}>
                    {/* <Map mapElement={mapElement} /> */}
                    <div ref={mapElement} style={{ minHeight: '500px' }}></div>

                </GridItem>

                <GridItem>
                    <Categories />
                </GridItem>

                <GridItem>
                    <Bookmark />
                </GridItem>
            </Grid >

            <Box p={3}>
                <StoreList placeElem={placeElem} placesList={placesList} />
            </Box>

        </main >
    )
}

export default Main