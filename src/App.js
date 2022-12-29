import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import Home from './components/Home';
import Login from './components/Login';
import MyEvents from './components/MyEvents';
import NavBar from './components/NavBar';
import Participate from './components/Participate';
import Pending from './components/Pending';
import SignUp from './components/SignUp';
export const backendUrl = process.env.backendUrl || 'http://localhost:5000';

function App() {
  console.log(backendUrl);
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