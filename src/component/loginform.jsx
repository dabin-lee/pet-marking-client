import React, { useEffect, useState } from 'react'

export default function Loginform() {


    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [arrowBtn, setArrowBtn] = useState(true)
    const [emailValid, setEmailValid] = useState(false)
    const [pwValid, setPwValid] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value)
        const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (regex.test(email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
        console.log('emailValid: ', emailValid);
    }
    const handlePw = (e) => {
        setPw(e.target.value)
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        // 8 ~10 영문 , 숫자 조함
        if (regex.test(pw)) {
            setPwValid(true)
        } else {
            setPwValid(false)
        }
    }


    useEffect(() => {
        if (emailValid && pwValid) {
            setArrowBtn(false)
        }
    }, [emailValid, pwValid])


    return (
        <div className="loginForm">
            {/* <div className="tit">
                <p>이메일과 비밀번호를<br />입력해주세요.</p>
            </div> */}

            <div className="loginContWrap">
                <div className="idArea">
                    <div className="userid loginInfo">
                        <div className="tit">이메일</div>

                        <div className="inputWrap">
                            <label htmlFor="loginId"><span>id</span></label>
                            <input type="text"
                                id="loginId"
                                value={email}
                                onChange={(e) => handleEmail(e)}
                            />
                        </div>
                    </div>
                    <p className="errormessage">
                        {
                            !emailValid && email.length > 0 && (<p>올바른 이메일을 입력해주세요.</p>)
                        }
                        {/* 아무것도 입력되지 않았을 때는 띄우지 않음 */}
                    </p>
                </div>
                <div className="pwArea">
                    <div className="userpw loginInfo">
                        <div className="tit">비밀번호</div>
                        <div className="inputWrap">
                            <label htmlFor="pwId"><span>pw</span></label>
                            <input type="password" id="pwId"
                                value={pw}
                                onChange={(e) => handlePw(e)}
                            />
                        </div>
                    </div>
                    <p className="errormessage">
                        {
                            !pwValid && pw.length > 0 && (
                                <p>영문, 숫자 포함 8자리 이상 입력해주세요.</p>
                            )
                        }</p>
                </div>
            </div>

            <div className="logBtn">
                <button type="button" className="loginBtn" disabled={arrowBtn}>확인</button>
            </div>
        </div>
    )
}
