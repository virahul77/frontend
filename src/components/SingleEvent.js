import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import './SingleEvent.css';
// import {backendUrl} from ''

const SingleEvent = ({event}) => {
  const token = useSelector(state => state.token);
  const navigate = useNavigate();
  console.log(event);
  const description = event.description;
  // console.log(description);
  const [status,setStatus] = useState('Request to Join');
  const handleAction = async ()=> {
    if(status==='Request to Join'){
      const res = await fetch(`${backendUrl}/event/joinevent/${event._id.toString()}`,{
        method:'put',
        headers:{'Content-Type':'application json',token:token}
      })
      const data = await res.json();
      console.log(data);
      getStatus();
    }

    if(status==='Pending..') {
      setStatus('Cancel Join');
    }
    if(status==='Cancel Join'){
      const res = await fetch(`${backendUrl}/event/canceljoin/${event._id.toString()}`,{
        method:'put',
        headers:{'Content-Type':'application json',token:token}
      })
      const data = await res.json();
      console.log(data);
      getStatus();
    }
    
  }
  const getStatus = async ()=> {
    if(!token) {return navigate('/login')}
    const res = await fetch(`${backendUrl}/event/eventstatus/${event._id.toString()}`,{
      method:'post',
      headers:{'Content-Type':'application json',token:token}
    })
    const data = await res.json();
    // console.log(data);
    setStatus(data);
  }

  useEffect(()=>{
    getStatus();
  },[])
  return (
    <div className='col-md-3'>
      <div className='card'>
        <img src={event.image} alt="event pic" />
        <div className='card-body'>
          <h5 className="card-title">{event.eventName}</h5>
          <p>Orgainsed by {event.createdBy.username}</p>
          <p>Total Seats : {event.totalSeats}</p>
          <p>Available Seats : {event.totalSeats - event.currentParticipants.length}</p>
        <button className='card-link btn-outline-primary btn'>More Details</button>
        <button className='card-link btn-outline-success btn' onClick={handleAction}>{status}</button>
        </div>
        </div>
    </div>
  )
}

export default SingleEvent