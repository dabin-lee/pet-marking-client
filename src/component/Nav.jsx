import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { keepId, userAtom } from '../atom/user.atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { Button, HStack, VisuallyHidden, Flex, Grid } from '@chakra-ui/react'
import { css } from '@emotion/react'

function Nav() {
    const [chk, setChk] = useRecoilState(keepId)
    const [user, setUser] = useRecoilState(userAtom)
    const histroy = useNavigate()

    const logOutUser = () => {
        const token = localStorage.getItem("토큰")
        // 체크해야 할 상태? email기억하기가 true일 경우엔 id랑 chk는 유지
        if (chk) {
            localStorage.clear(token)
            // 하지만 토큰이 지워지면 유저정보도 다 지워지눈뎅
        }
        localStorage.clear()
        setUser(null)
        histroy('/')
    }

    const navWrap = css`
        position: fixed;
        width: 100%;
        min-width: 1100px;
        padding: 0 30px;
        background-color: #F6F5F0;
        z-index: 999;
    `
    const btn = css`
        font-weight: normal;
        &:hover {
            color: black;
        }
        `

    const imageBox = css`
    align-items: center;
    `
    return (
        <div css={navWrap}>
            <Flex justifyContent="space-between" p={3}>
                <Grid w={150} css={imageBox}>
                    <Link to="/main">
                        <img src={process.env.PUBLIC_URL + `/marking_dog.png`} alt="" />
                    </Link>
                </Grid>

                <HStack direction='row' spacing={4} align='center'>
                    <Button bg="brand.100" colorScheme="whiteAlpha" _hover={{ bg: '#ebedf0' }} css={btn} size='md'>
                        <FontAwesomeIcon icon={faBell} />
                        <VisuallyHidden>message</VisuallyHidden>
                    </Button>

                    <Link to="/main/user">
                        <Button bg="brand.100" colorScheme="whiteAlpha" _hover={{ bg: '#ebedf0' }} css={btn} size='md'>
                            <FontAwesomeIcon icon={faUser} />
                            <VisuallyHidden>User</VisuallyHidden>
                        </Button>
                    </Link>
                    <Button bg="brand.100" colorScheme="whiteAlpha" _hover={{ bg: '#ebedf0' }} css={btn} onClick={logOutUser}>
                        로그아웃
                    </Button>
                </HStack >
            </Flex>
        </div>
    )
}

export default Nav
/** @jsxImportSource @emotion/react */