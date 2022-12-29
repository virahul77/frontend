import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { backendUrl } from '../App';
import NavBar from './NavBar'
import SingleEvent from './SingleEvent';

const Pending = () => {
  const token = useSelector(state => state.token);
  const [events,setEvents] = useState([])
  const getMyPendingEvents = async ()=> {
    const res = await fetch(`${backendUrl}/event/pending`,{
      headers:{'Content-Type':'application json',token:token}
    })
    const data = await res.json();
    setEvents(data)
    // console.log(data);
  }

  useEffect(()=>{
    getMyPendingEvents();
  },[])
  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <h2 className='mb-3'>Your Pending Events</h2>
        <div className="row d-flex justify-content-start">
          {events.map((event) => {
            return <SingleEvent key={event._id} event={event} />;
          })}
        </div>
        {events.length===0 && <h5>No Pending Events</h5>}
    </div>
    </div>
  )
}

export default Pending