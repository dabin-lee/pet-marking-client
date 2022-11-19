import React from 'react'
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'

// Swiper
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function StoreList({ placesList, mustgo }) {

    const [recommendList, setRecommendList] = useState([])
    useEffect(() => {
        recommendPlace()
    }, [])

    useEffect(() => {
        console.log('recommendList: ', recommendList);
    }, [recommendList])

    const recommendPlace = async () => {
        try {
            const request = await axios.get("http://localhost:3000/store/mustgo")
            setRecommendList(request.data)
        } catch (err) {
            console.log(err)
        }
    }


    const place = css`
        object-fit: contain;
        margin: 5px 5px 0 0;
        border-radius: 4px;
        transition: 400ms all ease-in-out;
        img:hover{
            transition: 400ms all ease-in-out;
            transform: scale(1.1);
        }
        `
    const info = css`
            margin: 15px 0;
            padding-right: 10px;
			font-size: 15px;
            p{
                margin-top: 2px;
                font-size: 13px;
            }
            h5{
                word-break: keep-all;
            }
        `
    const imgBox = css`
        height: 120px;
        overflow: hidden;
        img{
            width: 100%;
        }
    `

    return (
        <div>
            <h2>추천 맛집</h2>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView={4}
                navigation={true}
                pagination={{ clickable: true }}
            >
                <div>
                    {
                        (mustgo ? placesList : recommendList).map(data =>
                        (<SwiperSlide key={data._id ?? data.id}>
                            <div css={place}>
                                <div css={imgBox}>
                                    <img src={data.place_image} alt="markimg" />
                                </div>
                                <div css={info}>
                                    <h5>{data.place_name}</h5>
                                    <p>{data.road_address_name}</p>
                                    <p>{data.phone}</p>
                                </div>
                            </div>
                        </SwiperSlide>)
                        )
                    }
                </div>
            </Swiper>
        </div>

    )
}

export default StoreList
/** @jsxImportSource @emotion/react */