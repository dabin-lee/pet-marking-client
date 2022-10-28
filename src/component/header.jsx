
import React from 'react'
import Loginform from '../component/loginform'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faBell } from '@fortawesome/free-solid-svg-icons'

function Header({ search, chgSearch, searchInput, searchPlace }) {
    return (
        <header>
            <div className="inner">
                <div className="nav">
                    <div className="logo">
                        <img src={process.env.PUBLIC_URL + `/marking_dog.png`} alt="" />
                    </div>
                    <div className="searchBox ">
                        <div className="submitBox">
                            <label htmlFor="searchBox"><span>search</span></label>
                            <input type="text" id="searchBox"
                                placeholder="반려동물 동반"
                                value={search}
                                onChange={chgSearch}
                                ref={searchInput}
                            />
                        </div>
                        <div className="searchBtn">
                            <button onClick={searchPlace}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>

                    <div className="navbar-login">
                        {/* <Loginform /> */}
                        <a href="/">
                            <FontAwesomeIcon icon={faBell} />
                            <span>message</span>
                        </a>

                        <a href="/">
                            <FontAwesomeIcon icon={faUser} />
                            <span>User</span>
                        </a>
                        <button>로그아웃</button>
                    </div>


                </div>
            </div>
        </header>
    )
}

export default Header