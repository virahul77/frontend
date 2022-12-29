import React, { useState } from 'react'
import { backendUrl } from '../App';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const CreateEvent = () => {
//   const user = useSelector(state=>state.user);
  const navigate = useNavigate();

//   if(!user){
//     navigate('/register');
//   }
  const token = useSelector(state=>state.token);
  const [eventName,setEventName] = useState('cricket');
  const [totalSeats,setTotalSeats] = useState('');
  const [description,setDescription] = useState('');

  const submitHandler = async (e)=> {
    e.preventDefault();
    if(!token) {
        alert('please login first');
        return navigate('/login');
    }
    if(!totalSeats){
        return alert('please enter total participants');
    }
    if(description.length<8){
        return alert('Please add a description upto 8 characters')
    }
    const res = await fetch(`${backendUrl}/event/createevent`,{
        method:'post',
        headers:{
            'Content-Type':'application/json',
            token
        },
        body:JSON.stringify({eventName,totalSeats,description})
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <>
    <NavBar/>
    <div className='container mt-3 mb-3'>
        <h2 className='mob-3'>Create an Event</h2>
        <form onSubmit={submitHandler}>
        <p>Select Sport :</p>
        <select className='form-select form-select-lg mb-3' value={eventName} onChange={(e)=>setEventName(e.target.value)}>
            <option value="cricket">Cricket</option>
            <option value="volleyball">Vollyball</option>
            <option value="badminton">Badminton</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
        </select>
        <div className="mb-3">
          <label for="totalseats" class="form-label">Total Participants</label>
          <input type="number" class="form-control" id="totalseats" placeholder="enter number of participants"
            value={totalSeats} onChange={(e)=>setTotalSeats(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="description-area" class="form-label">Description</label>
          <textarea className="form-control" id="description-area" rows="3"
            value={description} onChange={(e)=>setDescription(e.target.value)}
            placeholder='Enter description about event minimun 8 characters'
          ></textarea>
        </div>
        <button className='btn btn-outline-success' type='submit'>Create Event</button>
        </form>
    </div>
    </>
  )
}

const form = ()=> {
  return (
    <>
      <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    </>
  )
}

export default CreateEvent