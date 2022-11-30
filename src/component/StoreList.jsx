import React from 'react'
import { css } from '@emotion/react'

// Swiper
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function StoreList({ placesList, itemOpenModal }) {

    const slideBox = css`
    min-width: 1100px;
    height: 380px;
            padding: 0 30px 10px;
            h2{
                margin-bottom: 5px;
                font-size: 1.5rem;
                font-family: 'Noto Sans KR',sans-serif;
            }
    `
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
                margin-bottom: 5px;
                color:lightsalmon;
                font-weight: bold;
                word-break: keep-all;
            }
        `
    const imgBox = css`
        height: 250px; 
        object-fit: cover;
        overflow: hidden;
        @media (max-width: 1400px) {
            height: 155px;
        }
        img{
            width: 100%;
            height: 100%;
        }
    `

    return (
        <div css={slideBox}>
            <h2>🐶 댕댕이와 함께하는 추천 장소</h2>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={5}
                slidesPerView={5}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                <div>
                    {
                        placesList.map(data =>
                        (<SwiperSlide key={data._id ?? data.id}>
                            <div css={place} onClick={() => itemOpenModal(data)}>
                                <div css={imgBox}>
                                    <img src={data.place_image} alt="marking" />
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