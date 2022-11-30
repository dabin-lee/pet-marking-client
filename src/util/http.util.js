export const getHostUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'http://ec2-13-209-84-216.ap-northeast-2.compute.amazonaws.com:3000'
    } else {
        return 'http://localhost:3000'
    }
}