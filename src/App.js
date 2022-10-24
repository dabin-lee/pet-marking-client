
import './App.scss';
import Main from './page/main'
import Signin from './page/signin';
import Signup from './page/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route index path="/main" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
