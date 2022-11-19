import axios from 'axios';


const randomImg = axios.create({
    baseURL: `https://api.unsplash.com/photos/random?client_id=KheA_Mb95Tz8yN9c1CYlyBIdaIZ0kI9hFQFHfFdVqis`,
    params: {
        // client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        count: 30,
    }
});

export default randomImg