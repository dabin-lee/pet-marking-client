import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form'
import axios from 'axios';



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

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onValue = (data) => {
        axios.post('http://localhost:3000', {
            id: Date.now(),
            userId: data.email,
            userPw: data.pw
        }).then(res => console.log(res))
    }
    return (
        <SigninPage>
            <div className="wrapper">
                <div className="loginBox">
                    <h2>
                        <img src={`${process.env.PUBLIC_URL}/marking_dog.png`} alt='펫마킹' style={{ width: '150px' }} />
                    </h2>
                    <form onSubmit={handleSubmit(onValue)} >
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
                                value="rememberMe"
                                id="rememberMe"
                            /> 로그인 상태 유지
                        </label >
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