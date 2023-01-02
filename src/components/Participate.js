import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { backendUrl } from '../App';
import PartEventDetails from './PartEventDetails';
import Loader from './Loader';

const Participate = () => {
  const token = useSelector(state=> state.token);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [partEvents,setPartEvents] = useState([]);
  const getParticipatedEvents = ()=> {
    if(!token) return navigate('/login');
    setIsLoading(true);
    fetch(`${backendUrl}/event/participated`,{
      headers:{token:token}
    }).then(res => res.json())
    .then(data => {
      setIsLoading(false);
      setPartEvents(data);
    })
    .catch(err=>{
      setIsLoading(false);
      console.log(err.message)
    })
  }

  useEffect(()=>{
    getParticipatedEvents();
  },[])

  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <h2 className='mb-3'>Your Participated Events</h2>
        {isLoading && <Loader />}
        {!isLoading && partEvents.map(eventId=>{
          return <PartEventDetails eventId={eventId} key={eventId}/>
        })}

        {!isLoading && partEvents.length===0 && <h5>No participated events</h5>}
      </div>
    </div>
  )
}

export default Participate