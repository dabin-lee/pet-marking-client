import React from 'react'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'
import axios from 'axios'
import randomImg from '../API/unsplash'

function Bookmark() {
    const [list, setList] = useState([])
    const [mealThumb, setMealThumb] = useState([])
    // const [backImgUrl, setBackImgUrl] = useState("");
    useEffect(() => {
        bookmarkList()
        bookmarkImg()
    }, [])

    const bookmarkList = async () => {
        try {
            const request = await axios.get("http://localhost:3000/store/bookmark")
            setList(request.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const bookmarkImg = async () => {
        const response = await randomImg.get()
        console.log('response: ', response);
        const randomId = response.data[Math.floor(Math.random() * 30)].urls.small
        setMealThumb(randomId)
    }
    console.log(mealThumb)

    const storeList = css`
    max-height: 440px;
    margin-top: 15px;
    padding: 5px 5px 0 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left: none;
    border-right: none;
    overflow-y: auto;
    `

    const listItem = css`
    width: 100%;
    margin-bottom: 5px;
    padding: 10px 15px 10px 25px;
    background-color: rgba(0, 0, 0, 0.05);
    background-image: 
        linear-gradient(
            90deg,
            #F4BB44 10px,
            #EEE 10px,
            #EEE 11px,
            transparent 11px);
    border: 1px solid #CCC;
    border-radius: 3px;
    list-style: none;
    box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    cursor: pointer;
    `
    const title = css`
        margin-top: 10px;
        font-size: 1.5rem;
        font-family: 'Noto Sans KR', sans-serif;
        span{
            margin-left: 6px;
        }
    `

    // const randomImg = (idx) => {
    //     const randomId = mealThumb.data[Math.floor(Math.random() * 30) + idx].urls.small
    //     // setMealThumb(randomId)
    //     return randomId
    // }

    return (
        <>
            <h2 css={title}>
                <FontAwesomeIcon icon={faBookmark} style={{ color: "#F4BB44" }} />
                <span>북마크</span>
            </h2>
            <ul css={storeList}>
                {
                    list.map((store, index) => (
                        <Flex css={listItem} key={store.id}>
                            <div className="imgbox">
                                {/* <img src={() => randomImg(index)} alt="" width={200} /> */}
                            </div>
                            <div className="cont">
                                <p>{store.place_name}</p>
                                <div className="info">
                                    <p>{store.road_address_name}</p>
                                    <p>{store.phone}</p>
                                </div>
                            </div>
                        </Flex>
                    ))
                }
            </ul>
        </>
    )
}

export default Bookmark
/** @jsxImportSource @emotion/react */