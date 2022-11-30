import axios from 'axios';


const randomImg = axios.create({
    baseURL: `https://api.unsplash.com/photos/random/?h=400`,
    headers: {
        Authorization: 'Client-ID ' + process.env.REACT_APP_UNSPLASH_API_KEY
    },
    params: {
        count: 30,
        query: 'food, pet',
    }
});

export const randomImgFunc = (count) => {
    return axios.create({
        baseURL: `https://api.unsplash.com/photos/random/?h=400`,
        headers: {
            Authorization: 'Client-ID ' + process.env.REACT_APP_UNSPLASH_API_KEY
        },
        params: { count, query: 'food, pet' }
    }).get()
}

export default randomImg