
// import './App.scss';
import './App.css';
import Main from './page/main'
import Signin from './page/signin';
import Signup from './page/signup';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setInterceptor } from './utill'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userAtom } from './atom/user.atom';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Nav from './component/Nav';
import User from './page/User.jsx'
import { getHostUrl } from './util/http.util';


const App = () => {

  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

  const [isInit, setIsInit] = useState(false)
  const [userState, setUserState] = useRecoilState(userAtom)
  const history = useNavigate()
  useEffect(() => {
    const fristToken = localStorage.getItem('토큰') //로컬스토리지 데이터 key에 '토큰'이있다면 값이 나와
    // console.log('fristToken: ', fristToken);
    if (fristToken) {
      axios.post(`${getHostUrl()}/auth/comfirm-token`, {
        token: fristToken
      }).then(res => {
        console.log('res: ', res);
        // 유효한 토큰인거 확인완료
        setInterceptor(fristToken)
        const user = {
          id: res.data.userId,
          name: res.data.name
        }
        console.log('user: ', user);
        setUserState(user)
        setIsInit(true)
      }).catch(err => {
        localStorage.clear()
        setIsInit(true)
        history('/')
      })
    } else {
      setIsInit(true)
      history('/')
    }
  }, [])

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#F4BB44",
        900: "#1a202c",
      },
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  })

  return (
    <>
      {
        isInit ?
          (
            <ChakraProvider theme={theme}>
              <Routes>
                <Route path="/" element={<Signin />}></Route>
                <Route path="/signup" element={<Signup />}></Route>

                <Route path="/main" element={<Layout />}>
                  <Route index element={<Main />} />
                  <Route path="/main/user" element={<User />} />
                </Route>
              </Routes >
            </ChakraProvider>
          ) : ' '
      }
    </>
  );
}


const Layout = () => {

  const [user, setUser] = useRecoilState(userAtom)
  const history = useNavigate()

  useEffect(() => {
    console.log(user)
    if (!user) history('/')
  }, [])


  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}
export default App;
