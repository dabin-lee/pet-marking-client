import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import axios from 'axios'
import { useState, useEffect } from 'react'

function StoreList({ placesList, placeElem, mustgo }) {

    const [RecommendList, setRecommendList] = useState([])
    useEffect(() => {
        recommendPlace()
    }, [])

    const recommendPlace = async () => {
        const request = await axios.get("http://localhost:3000/store/mustgo")
        setRecommendList(request.data)
    }
    const place = css`
        object-fit: contain;
        margin: 5px 5px 0 0;
        /* padding: 10px 0; */
        border-radius: 4px;
        transition: 400ms all ease-in-out;
        img:hover{
            transition: 400ms all ease-in-out;
            transform: scale(1.1);
        }
        `
    const info = css`
            display: flex;
            width: 300px;
            margin: 15px 0;
            padding-right: 10px;
			font-size: 15px;
            p{
                margin-top: 2px;
                font-size: 13px;
            }
        `
    const markerbg = css`
            width: 36px;
            height: 50px;
            background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;        
            `


    return (
        mustgo ?
            (
                <>
                    <Text fontSize={20}>true일때_검색 List 출력</Text>

                    <span className="arrow"
                        onClick={() => placeElem.current.scrollLeft -= window.innerWidth - 80}
                    >{'<'}</span>

                    <Flex ref={placeElem} pt={5} mb={20} style={{ overflow: "hidden" }}>
                        {
                            placesList.map((data) => (
                                <div key={data.id} css={place}>
                                    <img src="https://image.freepik.com/free-photo/spaghetti-with-carbonara-sauce_1216-324.jpg" alt="markimg" />                            <div css={info}>
                                        <span css={markerbg}></span>
                                        <div>
                                            <h5>{data.place_name}</h5>
                                            <p>{data.road_address_name}</p>
                                            <p>{data.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Flex >
                    <span className="arrow"
                        onClick={() => placeElem.current.scrollLeft += window.innerWidth - 80}
                    >{'>'}</span>
                </>
            )
            :
            (
                <>
                    <Text fontSize={20}>false일때 default 화면</Text>
                    <Flex ref={placeElem} pt={5} mb={20} style={{ overflow: "hidden" }}>
                        {
                            RecommendList.map((data) => (
                                <div key={data.x} css={place}>
                                    <img src={data.place_url} alt="markimg" />
                                    <div css={info}>
                                        <div>
                                            <h5>{data.place_name}</h5>
                                            <p>{data.road_address_name}</p>
                                            <p>{data.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Flex>
                </>
            )

    )
}

export default StoreList
/** @jsxImportSource @emotion/react */