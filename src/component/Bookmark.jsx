import React from 'react'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'
import axios from 'axios'

// recoil
import { useRecoilState } from 'recoil';
import { likeList, unsplashImg } from '../atom/user.atom';
import { getHostUrl } from '../util/http.util'

function Bookmark() {
    const [list, setList] = useRecoilState(likeList)
    const [thumb, setThumb] = useRecoilState(unsplashImg)
    const [fadeTit, setFadeTit] = useState(false)

    useEffect(() => {
        console.log('북마크 화면');
    }, []) //렌더링 후 한번만 호출

    useEffect(() => {
        if (thumb?.data?.length) bookmarkList()
    }, [thumb])

    const bookmarkList = async () => {
        try {
            const bookmarkRes = await axios.get(`${getHostUrl()}/store/bookmark`)
            setList(bookmarkRes.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteLike = async (elem) => {
        // console.log('elem: ', elem);
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`${getHostUrl()}/store/bookmark`, {
                    data: { _id: elem._id }
                })
                const newList = await axios.get(`${getHostUrl()}/store/bookmark`)
                setList(newList.data)
            } catch (err) {
                console.log(err)
            }
        }
    }



    const storeList = css`
    width: 100%;
    max-height: 500px;
    /* margin-top: 15px; */
    padding: 0 5px 0 5px;
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
    border-left: none;
    border-right: none;
    overflow:scroll;
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
        min-width: 100px;
        margin-bottom: 10px;
        font-size: 1.5rem;
        font-family: 'Noto Sans KR', sans-serif;
        span{
            margin-left: 6px;
        }
    `
    const imgbox = css`
        max-width: 200px;
        height: 150px;
        overflow: hidden;
    `
    const info = css`
    position: relative;
    width: 100%;
    margin-left: 10px;
    p{
        margin-top: 2px;
        font-size: 13px;
    }
    h5{
        max-width: 190px;
        margin-bottom: 5px;
        font-weight: bold;
        word-break: keep-all;
    }
    `
    const likeBtn = css`
        position: absolute;
        right: 0; 
        top: 0;
    `


    return (
        <>
            <h2 css={title}>
                <FontAwesomeIcon icon={faBookmark} style={{ color: "#F4BB44" }} />
                <span>북마크</span>
            </h2>
            <ul css={storeList}>
                {
                    list.map((store) => (
                        <Flex css={listItem} key={store._id}>
                            <div css={imgbox}>
                                <img src={store.place_image} alt="unsplash random" width="100%" />
                            </div>
                            <div css={info}>
                                <h5>{store.place_name}</h5>
                                <div css={likeBtn} onClick={() => deleteLike(store)}>
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "#f44336" }} />
                                </div>

                                <div>
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