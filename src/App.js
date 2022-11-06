
import './App.scss';
import Main from './page/main'
import Signin from './page/signin';
import Signup from './page/signup';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setInterceptor } from './utill'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userAtom } from './atom/user.atom';

const App = () => {

  const [isInit, setIsInit] = useState(false)
  const [userState, setUserState] = useRecoilState(userAtom)
  const history = useNavigate()
  useEffect(() => {
    const fristToken = localStorage.getItem('토큰') //로컬스토리지 데이터 key에 '토큰'이있다면 값이 나와
    // console.log('fristToken: ', fristToken);
    if (fristToken) {
      axios.post('http://localhost:3000/auth/comfirm-token', {
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

  return (
    <>
      {
        isInit ?
          (
            < Routes >
              <Route path="/" element={<Signin />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route index path="/main" element={<Main />}></Route>
            </Routes >
          ) : ' '
      }
    </>
  );
}

export default App;
