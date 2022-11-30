
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Button, InputGroup, InputRightElement, Input, Box, VisuallyHidden } from '@chakra-ui/react'
import { css } from '@emotion/react'

function Header({ search, chgSearch, searchInput, searchPlace }) {

    const header = css`
    height: 110px;
    min-width: 1100px;
    border-bottom: 1px solid #c8c8c8;
    `
    const search_Box = css`
        position: relative;
        max-width: 450px;
        margin: 0 auto;
        z-index: 9999;
    `
    const searchBtn = css`
        position: absolute;
        right: 10px;
        svg {
            height: 1.5rem;
            color: #F4BB44;
            }
    `

    return (
        <header css={header}>
            <Box css={search_Box} p={30}>
                <InputGroup w="100%">
                    <VisuallyHidden>search</VisuallyHidden>
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
            </Box>
        </header >
    )
}

export default Header
/** @jsxImportSource @emotion/react */

