import React, { useRef } from 'react'
import styled from 'styled-components';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SignupPage = styled.div`
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
                padding: 6px 12px;
                vertical-align: middle;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
                color: #555;
                font-size: 13px;
            }

            input ~ input{
                margin-top:15px;
            }
            
        p {
            padding:12px 0 0 5px;
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
        .signupBtn{
            margin: 20px 0;
        }
    }
`

export default function Signup() {

    const history = useNavigate()

    const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur' })
    const pw = useRef()
    const onValue = (data) => {
        axios.post('http://localhost:3000/auth/register', {
            email: data.email,
            pw: data.pw,
            pwComfirm: data.pwComfirm,
            name: data.name
        }).then((res) => {
            console.log(res)
            alert('회원가입이 완료되었습니다.')
            localStorage.setItem('token', res.data.userToken)
            // 서버에서 만든토큰을 클라이언트에서 저장
            // 액세스토큰 로컬스토리지에 넣음
            history('/')
        })
    }

    return (
        <SignupPage>
            <div className="wrapper">
                <div className="loginBox">
                    <h2>
                        회원가입
                    </h2>
                    <form onSubmit={handleSubmit(onValue)} >
                        <input type="text"
                            placeholder="이메일"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/
                                }
                            })}
                        />
                        {errors.email && errors.email.type === "required" && <p>이메일을 입력해 주세요.</p>}
                        {errors.email?.type === "pattern" && <p>이메일 형식에 맞지 않습니다.</p>}

                        <input type="password"
                            placeholder="비밀번호"
                            {...register("pw", {
                                required: true,
                                minLength: 8
                            })}
                        />
                        {errors.pw?.type === "required" && <p>비밀번호를 입력해 주세요.</p>}
                        {errors.pw?.type === "minLength" && <p>8글자 이상 입력해주세요.</p>}

                        <input type="password"
                            placeholder="비밀번호"
                            {...register("pwComfirm", {
                                required: true,
                                minLength: 8,
                                validate: (value) => {
                                    if (value !== pw) {
                                        // setError(
                                        //     "pwComfirm",
                                        //     { message: { message } },
                                        // )
                                    }
                                }
                            })}
                        />
                        {errors.pw?.type === "minLength" && <p>8글자 이상 입력해주세요.</p>}
                        {/* <ErrorMessage
                            errors={errors}
                            name="pwComfirm"
                            render={({ message }) => <p>비밀번호가 일치하지 않습니다.</p>}
                        /> */}
                        <input type="text"
                            className="name"
                            placeholder="이름"
                            {...register("name", {
                                required: true,
                                maxLength: 5
                            })}
                        />
                        {errors.name?.type === "required" && <p>이름을 입력해 주세요.</p>}

                        <button type="submit" className="signupBtn">
                            <span>가입하기</span>
                            {/* 통신이 완료되면 가입완료 모달 띄우기 */}
                        </button>
                    </form >
                </div>
            </div >
        </SignupPage >
    )
}
