import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { backendUrl } from '../App';
import NavBar from './NavBar'
import PartEventDetails from './PartEventDetails';

const EventDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {user,token} = useSelector(state => state);
  const eventId = params.eventId;
  const getEventDetail = async()=> {
    if(!token) navigate('/login');
    const res = await fetch(`${backendUrl}/event/single/${eventId}`,{
        headers:{token:token}
      })

      const data = await res.json();
      console.log(data);
  }

  useEffect(()=>{
    getEventDetail();
  },[])
  console.log(eventId);
  return (
    <div>
        <NavBar />
        <div className="container mt-3">
          <PartEventDetails eventId={eventId}/>
        </div>
    </div>
  )
}

export default EventDetail