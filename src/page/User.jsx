import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { Flex, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Bookmark from '../component/Bookmark'
import axios from 'axios'
import { setInterceptor } from '../utill'
import { getHostUrl } from '../util/http.util'

function User() {


    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()
    const [user, setUser] = useState({})
    const [isEditing, setIsediting] = useState(false)
    const [editTit, setEditTit] = useState('')

    useEffect(() => {
        userInfo()
    }, [])

    const userInfo = async () => {
        try {
            const fristToken = localStorage.getItem('토큰')
            if (fristToken) {
                const res = await axios.post(`${getHostUrl()}/auth/comfirm-token`, {
                    token: fristToken
                })
                setInterceptor(fristToken)
                const user = {
                    id: res.data.userId,
                    name: res.data.name
                }
                setUser(user)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const wrap = css`
        min-width: 1100px;
        padding: 109px 30px 30px;
    `
    const tit = css`
        position: fixed;
        border-bottom: 1px solid #ddd;
        h1{
            font-weight: 700;
            font-size:40px;
        }
    `
    const userWrap = css`
        margin-top: 100px;
        gap: 10px;
        div{
            flex-shrink: 1 2;
        }
    `
    const iam = css`
        display: flex;
        justify-content: end;
        align-items: center;
        flex-flow: row;
        gap: 50px;
        padding: 40px;
        margin-top: 12px;
    `
    const avatar = css`
        width: 300px;
        height:300px;
        border-radius: 100%;
        overflow: hidden;
    `
    const info = css`
        min-width: 300px;
        /* margin-left: 50px; */
        font-size: 18px;
        li{
            margin-top: 7px;
            box-sizing: border-box;
            font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
            /* font-weight: 700; */
            font-size: 20px;
            h4{
                color: #595959;
                font-size: 1rem;
                font-weight: 800;
            }
        }
        `
    const editBox = css`
            margin-top: 5px;
            input{
                height: 40px;
                width: 100%;
                padding: 5px;
                vertical-align: middle;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
                color: #555;
                font-size: 14px;
            }
                p {
                    padding:5px 0 0 5px;
                    font-size: 12px;
                    text-align:left;
                    color: #ff003e;
                }
    `


    return (
        <div>
            <section css={wrap}>
                <div css={tit}>
                    <h1>Edit profile</h1>
                    <p>상세한 가입 계정 정보를 변경할 수 있어요.</p>
                </div>

                {/* user정보 수정 */}

                <Flex css={userWrap}>

                    <div css={iam}>
                        <div css={avatar}>
                            <img src="https://mblogthumb-phinf.pstatic.net/MjAyMTExMTdfMTg4/MDAxNjM3MTEwMTk5MTMw.h4JIsYp7DH-p3pYnNBTX7gLd2-zViVr43K29Z9dVGuog._6j47q65SxOdgTZRWBd8CYCms8w3FT7fWIwYtausf94g.JPEG.yuna111/08a37542581e1178a74f850a17964c1c204c109b732611cb3850e46c2a7f560a340d8c4ea3dc.jpg?type=w800" alt="" />
                        </div>


                        <div>
                            <form>
                                <ul css={info}>

                                    <li style={{ display: "inline-block" }}>
                                        <h4>Id</h4>
                                        <div>{user.id}</div>
                                    </li>
                                    <li>
                                        <h4>Name</h4>
                                        <div css={editBox}>
                                            <input type="text"
                                                placeholder={user.name}
                                                {...register("name", {
                                                    required: true,
                                                    maxLength: 5
                                                })}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <h4>Pw</h4>
                                        <div css={editBox}>
                                            <input type="password"
                                                placeholder="현재 비밀번호"
                                                {...register("pw", {
                                                    required: "비밀번호를 입력해 주세요.",
                                                    minLength: {
                                                        value: 8,
                                                        message: "8글자 이상 입력해주세요."
                                                    }
                                                })}
                                            />
                                            {errors.pw && <p>{errors.pw.message}</p>}
                                        </div>

                                        <div css={editBox}>
                                            <input type="password"
                                                placeholder="새 비밀번호"
                                                {...register("newPw", {
                                                    required: "비밀번호를 입력해 주세요.",
                                                    minLength: {
                                                        value: 8,
                                                        message: "8글자 이상 입력해주세요."
                                                    }
                                                })}
                                            />
                                            {errors.newPw && <p>{errors.newPw.message}</p>}
                                        </div>

                                        <div css={editBox}>
                                            <input type="password"
                                                placeholder="새 비밀번호 확인"
                                                {...register("pwComfirm", {
                                                    required: "비밀번호를 입력해 주세요.",
                                                    validate: value => {
                                                        if (watch('newPw') !== value) {
                                                            return "The passwords do not match"
                                                        }
                                                    }
                                                })}
                                            />
                                            {errors.pwComfirm && <p>{errors.pwComfirm.message}</p>}
                                        </div>
                                    </li>
                                </ul>

                                <Button
                                    as='button'
                                    height='30px'
                                    width='100%'
                                    lineHeight='1.2'
                                    marginTop='20px'
                                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                                    border='1px'
                                    px='8px'
                                    borderRadius='2px'
                                    fontSize='14px'
                                    fontWeight='semibold'
                                    bg='#f5f6f7'
                                    borderColor='#ccd0d5'
                                    color='#4b4f56'
                                    _hover={{ bg: '#ebedf0' }}
                                    _active={{
                                        bg: '#dddfe2',
                                        transform: 'scale(0.98)',
                                        borderColor: '#bec3c9',
                                    }}
                                    _focus={{
                                        boxShadow:
                                            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                                    }} type="submit">
                                    <span>정보 수정하기</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                    {/* 내가 북마크 한 리스트 */}
                    <Bookmark style={{ flex: 2 }} />
                </Flex>


            </section>
        </div>
    )
}

export default User
/** @jsxImportSource @emotion/react */