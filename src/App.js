
import './App.scss';
import Main from './page/main'
import Signin from './page/signin';
import Signup from './page/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { setInterceptor } from './utill'
const App = () => {

  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    const fristToken = localStorage.getItem('토큰') //로컬스토리지 데이터 key에 '토큰'이있다면 값이 나와
    console.log('fristToken: ', fristToken);
    if (fristToken) {
      setInterceptor(fristToken)
    }
    setIsInit(true)
  }, [])

  return (
    <>
      {
        isInit ?
          (<BrowserRouter>
            < Routes >
              <Route path="/" element={<Signin />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route index path="/main" element={<Main />}></Route>
            </Routes >
          </BrowserRouter >) : ' '
      }
    </>
  );
}

export default App;
