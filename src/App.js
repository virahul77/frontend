import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import Home from './components/Home';
import Login from './components/Login';
import MyEvents from './components/MyEvents';
import Participate from './components/Participate';
import Pending from './components/Pending';
import SignUp from './components/SignUp';
import { addUser, setToken } from './redux/userSlice';
export const backendUrl = process.env.backendUrl || 'http://localhost:5000';

function App() {
  const token = useSelector(state=> state.token);
  const dispatch = useDispatch();
  const getUserInfo = async ()=> {
    try {
      // if(!token) return window.location.replace('/login');
      const res = await fetch(`${backendUrl}/user/info`, {
        headers: {
          token: token
        },
      });
      const data = await res.json();
      dispatch(addUser(data))
    } catch (error) {
      console.log(error.message,'error');
      dispatch(addUser(''));
      dispatch(setToken(''))
      // return window.location.replace('/login');
    }
  }

  useEffect(()=>{
    getUserInfo();
  },[])
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/createevent' element={<CreateEvent />} />
          <Route path='/myevents' element={<MyEvents />} />
          <Route path='/participate' element={<Participate />} />
          <Route path='/pending' element={<Pending />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App