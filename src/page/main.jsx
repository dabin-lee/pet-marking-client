/* global kakao*/
import React, { useRef, useEffect, useState, useMemo } from 'react'
import Loginform from './loginform'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function Main() {

    const [search, setSearch] = useState('')
    const [map, setMap] = useState(null)
    const chgSearch = (e) => {
        setSearch(e.target.value)
    }
    const mapElement = useRef(null)


    useEffect(() => {
        console.log('map: ', map);
        if (!map) {
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };

            const newMap = new window.kakao.maps.Map(mapElement.current, options) //지도 생성 및 객체 리턴
            setMap(newMap)
        }
    }, [])

    useEffect(() => {
        console.log('map: ', map);
    }, [map])



    const searchPlace = () => {
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(search, placesSearchCB);

        // axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${search}`, {
        //     headers: {
        //         "Authorization": `KakaoAK 0f3f8d9f93cc9d6560cd7921c46f92cd`
        //     }
        // }).then(res => console.log('res: ', res))

    }

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
    }

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const displayMarker = (place) => {

        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }


    return (
        <main>
            <header>
                <div className="inner">
                    <div className="nav">
                        <div className="logo">
                            <img src={process.env.PUBLIC_URL + `/marking_dog.png`} alt="" />
                        </div>
                        <div className="searchBox">
                            <div className="submitBox">
                                <label htmlFor="searchBox"><span>search</span></label>
                                <input type="text" id="searchBox"
                                    placeholder="망고가 좋아했던 장소"
                                    value={search}
                                    onChange={chgSearch}
                                />
                            </div>
                            <div className="searchBtn">
                                <button onClick={searchPlace}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <Loginform />
                        </div>


                    </div>
                </div>
            </header>

            <section className="container">
                <div className="map__area">
                    <div ref={mapElement} style={{ minHeight: '400px' }}></div>
                </div>

                <div className="bookMark__area">
                    <ul>
                        <li>
                            <div className="imgbox"></div>
                            <div className="cont">
                                <h3>tit</h3>
                                <div className="info">
                                    <p>info1</p>
                                    <p>info2</p>
                                    <p>info3</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    )
}

export default Main