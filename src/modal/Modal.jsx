import axios from 'axios'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { likeList, unsplashImg } from '../atom/user.atom';
// import { useEffect, useCallback } from 'react';

import { randomImg, randomImgFunc } from '../API/unsplash'
import { getHostUrl } from '../util/http.util';

function ItemModal({ isOpen, onClose, modalItem }) {
    const [list, setList] = useRecoilState(likeList)
    const [thumb, setThumb] = useRecoilState(unsplashImg)

    const getStore = async () => {
        try {
            const place_image = await randomImgFunc(1)
            console.log('place_image: ', place_image);
            // const { address_name, category_group_code, category_name, id, phone, place_name, place_url, road_address_name, x: mapX, y: mapY} = modalItem
            await axios.post(`${getHostUrl()}/store/bookmark`, {
                ...modalItem,
                place_image: place_image?.data[0]?.urls?.small,
                mapX: modalItem.x,
                mapY: modalItem.y,
            })

            const newList = await axios.get(`${getHostUrl()}/store/bookmark`)
            // console.log('newList: ', newList);
            // console.log('newList: ', JSON.stringify(newList));
            setList(newList.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="53%" maxH="70%" h={800}>
                    <ModalHeader>{modalItem.place_name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody maxH="100%">
                        <iframe src={`https://place.map.kakao.com/${modalItem.id}`}
                            width="100%" height="100%"
                        ></iframe>
                    </ModalBody>

                    <ModalFooter>
                        <Button style={{ border: "1px solid #5a5a5a" }} mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button style={{ border: "1px solid #5a5a5a" }} variant='ghost' onClick={() => getStore()} >
                            <FontAwesomeIcon icon={faBookmark} style={{ color: "#F4BB44", marginRight: "3px" }} />Bookmark</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ItemModal