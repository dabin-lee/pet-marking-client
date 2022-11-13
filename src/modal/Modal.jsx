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


function ItemModal({ isOpen, onClose, modalItem }) {

    const getStore = async () => {
        await axios.post('http://localhost:3000/store/bookmark', {
            address_name: modalItem.address_name,
            category_group_code: modalItem.category_group_code,
            category_name: modalItem.category_name,
            id: modalItem.id,
            phone: modalItem.phone,
            place_name: modalItem.place_name,
            place_url: modalItem.place_url,
            road_address_name: modalItem.road_address_name,
            mapX: modalItem.x,
            mapY: modalItem.y,
        }).then(res =>
            alert('북마크 저장 완료')
        )
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
                        <Button style={{ border: "1px solid #5a5a5a" }} variant='ghost' onClick={getStore} >
                            <FontAwesomeIcon icon={faBookmark} style={{ color: "#F4BB44", marginRight: "3px" }} />Bookmark</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ItemModal