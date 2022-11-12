import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Bookmark() {
    return (
        <>

            <h3>
                <FontAwesomeIcon icon={faBookmark} style={{ color: "#F4BB44" }} />
                북마크
            </h3>
            <div className="imgbox">
                <img src="./images/hotel1.jpg" alt="" />
            </div>
            <div className="cont">
                <p>포레 851</p>
                <div className="info">
                    <p>리뷰없음</p>
                    <p>서울특별시 서대문구</p>
                    <p>영업시간: 오전 11:00 ~ 오후 18:00</p>
                </div>
            </div>
        </>
    )
}

export default Bookmark