import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import './SingleEvent.css';
// import {backendUrl} from ''

const MyEvDetail = ({event}) => {
  const token = useSelector(state => state.token);
  // const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const isPast = new Date(event.startDate)<Date.now();

  // console.log(event);
  const addToEvent = (eventId,userId)=>{
    if(!token) {return navigate('/login')}
    const res = fetch(`${backendUrl}/event/myevent/adduser`,{
        method:'put',
        headers:{
          'Content-Type':'application/json',
            token:token
        },
        body:JSON.stringify({userId,eventId})
    }).then(res=>res.json())
    .then(data => {
      console.log(data);
      window.location.reload();
    })
    .catch(err=>console.log(err.message));
  }
  const deleteFromEvent = (eventId,userId)=> {
    // console.log(eventId,userId);
    if(!token) {return navigate('/login')}
    fetch(`${backendUrl}/event/myevent/removeuser`,{
        method:'delete',
        headers:{
          'Content-Type':'application/json',
          token:token
        },
        body:JSON.stringify({userId,eventId})
    }).then(res=>res.json())
    .then(data => {
      console.log(data);
      window.location.reload();
    })
    .catch(err=>console.log(err.message));

  }

  // useEffect(()=>{
  //   getStatus();
  // },[])
  return (
    <div className='mb-4'>
      <div className='card w-60' style={{overflow:'hidden'}}>
        <img src={event.image} alt="event pic" style={{height:'500px'}} />
        <div className='card-body'>
          <h5 className="card-title">{event.eventName}</h5>
          {!isPast && <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>}
          {isPast && <p>Event Finished</p>}
          <p>Total Seats : {event.totalSeats}</p>
          {!isPast && <p>Available Seats : {event.totalSeats - event.currentParticipants.length}</p>}
          <p>Venue :- {event.venue}</p>
          <p>Description : {event.description}</p>
          <div>
            <p>Pending Users</p>
            <ul className="list-group">
                {/* <li className="list-group-item">An item</li> */}
                {event?.pending?.map(user=>{
                    return (
                        <div className="input-group mb-3" key={user._id}>
                            <span type="text" className="form-control" value={user.username}>{user.username}</span>
                            <button className="btn btn-outline-success mx-3" type="button" onClick={()=>addToEvent(event._id,user._id)}>Confirm</button>
                            <button className="btn btn-outline-danger" type="button" onClick={()=>deleteFromEvent(event._id,user._id)}>Cancel</button>
                        </div>
                    )
                })}
                {event?.pending?.length===0 && <p>No Pending Participants</p>}
            </ul>
          </div>
          <div>
            <p>Current Participants</p>
            <ul className="list-group">
                {/* <li className="list-group-item">An item</li> */}
                {event?.currentParticipants?.map(user=>{
                    return (
                        <div className="input-group mb-3" key={user._id}>
                            <span type="text" className="form-control" value={user.username}>{user.username}</span>
                        </div>
                    )
                })}
                {event?.currentParticipants?.length===0 && <p>No Participants Joined Yet</p>}
            </ul>
          </div>
        {isPast && <button className='card-link btn-outline-success btn disabled'>Finished</button>}
        </div>
        </div>
    </div>
  )
}

export default MyEvDetail