import { useRecoilState } from 'recoil';
import { unsplashImg } from '../atom/user.atom';
import { useEffect } from 'react';
import randomImg from '../API/unsplash'

export const Photo = () => {

    const [thumb, setThumb] = useRecoilState(unsplashImg)


    useEffect(() => {
        makeImg();
    }, [])

    const makeImg = async () => {
        try {
            const randomPhoto = await randomImg.get()
            setThumb(randomPhoto.data)
        } catch (err) {
            console.log(err)
        }
    }
    return thumb
}
// 그럼 listImage를 map 돌려야겟죠
// map 돌리면 새로운 배열을 만든다고 했죠?
// listImage map 돌려서 새로운 배열 만들어서 리코일에 넣고
// 밑에 로직은 걍 냅둬도 될듯요
