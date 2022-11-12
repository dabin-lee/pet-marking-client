
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { keepId } from '../atom/user.atom';
import { Button, HStack, VisuallyHidden, InputGroup, InputRightElement, Input, Flex, Box, Grid } from '@chakra-ui/react'
import { css } from '@emotion/react'

function Header({ search, chgSearch, searchInput, searchPlace }) {
    const [chk, setChk] = useRecoilState(keepId)
    const histroy = useNavigate()
    const logOutUser = () => {
        const token = localStorage.getItem("토큰")
        // 체크해야 할 상태? email기억하기가 true일 경우엔 id랑 chk는 유지
        if (chk) {
            localStorage.clear(token)
            // 하지만 토큰이 지워지면 유저정보도 다 지워지눈뎅
        }
        localStorage.clear()
        histroy('/')
    }


    const btn = css`
        font-weight: normal;
        &:hover {
            color: black;
        }
        `
    const searchBox = css`
        position: relative;
    `
    const searchBtn = css`
        position: absolute;
        right: 10px;
        svg {
            height: 1.5rem;
            color: #F4BB44;
            }
    `
    const imageBox = css`
        align-items: center;
    `

    return (
        <header>
            <div className="inner">
                <Flex justify="flex-end">
                    <Grid w={200} css={imageBox}>
                        <img src={process.env.PUBLIC_URL + `/marking_dog.png`} alt="" />
                    </Grid>
                    <Flex css={searchBox} w="100%" p={30}>
                        <InputGroup w="100%">
                            <label htmlFor="searchBox"><span>search</span></label>
                            <Input
                                bg="white"
                                border="none"
                                focusBorderColor='#F4BB44'
                                type="text"
                                id="searchBox"
                                placeholder="반려동물 동반"
                                _placeholder={{ opacity: 0.3 }}
                                value={search}
                                onChange={chgSearch}
                                ref={searchInput}
                            />
                            <InputRightElement css={searchBtn}>
                                <Button onClick={searchPlace} bg="none">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>

                    <HStack direction='row' spacing={4} align='center'>
                        <Button bg="brand.100" colorScheme="whiteAlpha" _hover={{ bg: '#ebedf0' }} css={btn} size='md'>
                            <FontAwesomeIcon icon={faBell} />
                            <VisuallyHidden>message</VisuallyHidden>
                        </Button>

                        <Button bg="brand.100" colorScheme="whiteAlpha" _hover={{ bg: '#ebedf0' }} css={btn} size='md'>
                            <FontAwesomeIcon icon={faUser} />
                            <VisuallyHidden>User</VisuallyHidden>
                        </Button>
                        <Button bg="brand.100" colorScheme="whiteAlpha" _hover={{ bg: '#ebedf0' }} css={btn} onClick={logOutUser}>
                            로그아웃
                        </Button>
                    </HStack >
                </Flex>
            </div>
        </header >
    )
}

export default Header

