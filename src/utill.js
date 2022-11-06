

import axios from 'axios';

export const setInterceptor = (token) => {

    if (!token) return false
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return true

}
// 헤더에 토큰을 넣어줌