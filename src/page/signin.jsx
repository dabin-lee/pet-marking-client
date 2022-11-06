import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { setInterceptor } from '../utill';
import { useRecoilState } from 'recoil';
import { userAtom } from '../atom/user.atom';
import { useEffect } from 'react';
const SigninPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #F6F5F0;
    
    h2{
        margin: 20px 0 30px;
        font-size: 2rem;
        text-align: center;
        span{
            position: absolute;
            clip: rect(0 0 0 0);
            width: 1px;
            height: 1px;
            margin: -1px;
            overflow: hidden;
        }
    }
    .loginBox{
        
        width: 500px;
        margin: 0 auto;
        padding: 30px;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 30px 60px 0 rgb(0 0 0 / 30%);
        
        form{
        display: flex;
        flex-direction: column;
        width: 100%;

            input{
                height: 34px;
                padding: 15px 80px;
                padding: 6px 12px;
                vertical-align: middle;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
                color: #555;
                font-size: 13px;
            }
            input.pw{
                margin-top: 15px;
            }
            
p {
    padding: 15px 0 3px 8px;
    font-size: 12px;
    text-align:left;
    color: #ff003e;
}

p::before {
    display: inline;
    content: "⚠ ";
}

            label.checkbox{
                margin-top: 15px;
                text-align:left;
            }
            button{
                height: 50px;
                margin-top: 15px;
                padding: 13px 0 13px;
                border: none;
                border-radius: 6px;
                background: #F4BB44;
                    span{
                        
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 24px;
                    color: #fff;
                    }
            }
        }
        .signup{
            margin: 20px 0;
            a{
                padding-left: 5px;
                color: #F4BB44;
            }
        }
    }
`

function Signin() {


    const history = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [chk, setChk] = useState(false)
    const [userState, setUserState] = useRecoilState(userAtom)
    const [keepUser, setKeepUser] = useState("")

    const onValue = async (data) => {
        console.log(data.email.value)
        try {
            const result = await axios.post('http://localhost:3000/auth/login', {
                email: data.email,
                pw: data.pw
            })
            console.log('result: ', result);

            if (result.data.message) {
                alert(result.data.message)
            }
            localStorage.setItem('토큰', result.data.loginToken)
            setInterceptor(result.data.loginToken)
            setUserState(
                {
                    id: result.data.userId,
                    name: result.data.name
                }
            )
            // 로그인 성공시 id저장
            localStorage.setItem('USER_ID', result.data.userId)
            localStorage.setItem('REMEBER_ID', JSON.parse(chk))
            history('/main')
        } catch (err) {
            if (err?.response?.status === 401) {
                alert(err?.response?.data?.message)
            } else {
                // 제어하지 못하는 에러 => 서버에 로그로 남김
                alert('서버요청에 실패했습니다.')
            }
        }
        // }).then(res => {
        //     // 만약 message가 있다면? 출력
        //     if (res.data.message) {
        //         alert(res.data.message)
        //     }
        //     localStorage.setItem('토큰', res.data.loginToken)
        //     localStorage.setItem('id', res.data.userId)

        //     setInterceptor(res.data.loginToken)
        //     history('/main')
        // }).catch(err => {
        //     if (err?.response?.status === 401) {
        //         alert(err?.response?.data?.message)
        //     } else {
        //         // 제어하지 못하는 에러 => 서버에 로그로 남김
        //         alert('서버요청에 실패했습니다.')
        //     }
        // })

        // noijoijo
    }

    const remeberId = (e) => {
        if (e.target.checked) {
            setChk(true)
        }
        else {
            setChk(false)
        }
    }

    useEffect(() => {
        let idFlag = JSON.parse(localStorage.getItem("REMEBER_ID"))
        let userId = window.localStorage.getItem("USER_ID")
        if (idFlag) {
            setChk(idFlag)
        }
        userId ? setKeepUser(userId) : setKeepUser(null)
    }, [])


    return (
        <SigninPage>
            <div className="wrapper">
                <div className="loginBox">
                    <h2>
                        <img src={`${process.env.PUBLIC_URL}/marking_dog.png`} alt='펫마킹' style={{ width: '150px' }} />
                    </h2>
                    <form onSubmit={handleSubmit(onValue)} >
                        {
                            chk ?
                                <input type="text"
                                    className="useremail"
                                    placeholder="이메일"
                                    value={keepUser}
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /\S+@\S+\.\S+/
                                        }
                                    })}
                                />
                                :
                                <input type="text"
                                    className="useremail"
                                    placeholder="이메일"
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /\S+@\S+\.\S+/
                                        }
                                    })}
                                />
                        }
                        {errors.email && errors.email.type === "required" && <p>이메일을 입력해 주세요.</p>}
                        {errors.email?.type === "pattern" && <p>이메일 형식에 맞지 않습니다.</p>}

                        <input type="password"
                            className="pw"
                            placeholder="비밀번호"
                            {...register("pw", {
                                required: true,
                                minLength: 8
                            })}
                        />
                        {errors.pw?.type === "required" && <p>비밀번호를 입력해 주세요.</p>}
                        {errors.pw?.type === "minLength" && <p>8자리 이상 입력해 주세요.</p>}

                        <label className="checkbox" >
                            <input type="checkbox"
                                id="rememberMe"
                                //onChange={eventLogin} //get토큰에서 isUnLimit 부분 true. false
                                value={chk}
                            /> 로그인 상태 유지
                        </label >
                        <label className="checkbox" >
                            <input type="checkbox"
                                id="rememberEmail"
                                onChange={remeberId}
                                checked={chk}
                            /> email 기억하기
                        </label >
                        {/* true일 경우 localstrage에 있는 id를 input에 유지시키기 */}
                        <button type="submit">
                            <span>로그인</span>
                        </button>
                    </form >
                    <div className="signup">Not registered?
                        <Link to="/signup" className="signup">Create an account</Link>
                    </div>
                </div>
            </div >
        </SigninPage >
    )
}

export default Signin


// 로그인 유지를 눌렀을 때 chk => true
// true일 경우 localstorage에 id를 저장
// fasle일 경우 localstorage clear

// login페이지 렌더링이 됐을 때 localstorage에 id가 있으면 email input에 id표시