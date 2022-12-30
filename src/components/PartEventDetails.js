import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

const PartEventDetails = ({eventId}) => {
  const [event,setEvent] = useState({});
  let isPast = new Date(event.startDate)<Date.now();
  const token = useSelector(state=>state.token);
  const navigate = useNavigate();
  const getEventDetail = async()=> {
    if(!token) navigate('/login');
    fetch(`${backendUrl}/event/single/${eventId}`,{
        headers:{token:token}
    }).then(res=>res.json())
    .then(data=>{
        setEvent(data);
    }).catch(err=>console.log(err.message));
  }
  console.log(event);

  useEffect(()=>{
    getEventDetail();
  },[])
  return (
    <div className='mb-4'>
      <div className='card w-60' style={{overflow:'hidden'}}>
        <img src={event.image} alt="event pic" style={{height:'500px'}} />
        <div className='card-body'>
          <h5 className="card-title">{event.eventName}</h5>
          <p>Created By :- {event.createdBy?.username}</p>

          {!isPast && <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>}
          {isPast && <p>Event Finished</p>}
          {!isPast && <p>Total Seats : {event.totalSeats}</p>}
          {!isPast && <p>Available Seats : {event.totalSeats - event.currentParticipants?.length}</p>}
          <p>Venue : {event.venue}</p>
          <p>Description : {event.description}</p>
          
          {event.participated && <div>
            <p>All Participants</p>
            <ul className="list-group">
                {event?.currentParticipants?.map(user=>{
                    return (
                        <div className="input-group mb-3" key={user._id}>
                            <span type="text" className="form-control" value={user.username}>{user.username}</span>
                        </div>
                    )
                })}
                {event?.currentParticipants?.length===0 && <p>No Participants Joined Yet</p>}
            </ul>
          </div>}
          {isPast && <button className='card-link btn-outline-success btn disabled'>Finished</button>}
        </div>
        </div>
    </div>
  )
}

export default PartEventDetails