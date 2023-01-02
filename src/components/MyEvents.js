import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../App';
import Loader from './Loader';
import MyEvDetail from './MyEvDetail';
import NavBar from './NavBar';
// import SingleEvent from './SingleEvent';

const MyEvents = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const token = useSelector(state => state.token);
  const [myEvents,setMyEvents] = useState([]);
  const fetchMyEvents = async ()=> {
    if(!token) {return navigate('/login')}
    setIsLoading(true);
    const res = await fetch(`${backendUrl}/event/myevents`,{
        method:'get',
        headers:{
          token:token
        },
    })
    const data = await res.json();
    
    if(data && data[0] &&data[0]['_id']) setMyEvents(data);
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchMyEvents();
  },[])
  
  return (
    <>
    <NavBar />
    <div className="container mt-3">
        <h2>My Events</h2>
        <div className="row d-flex justify-content-start">
          {isLoading && <Loader />}
        {!isLoading && myEvents.map(event=> {
            return <MyEvDetail key={event._id} event={event}/>
        })}
        </div>
    </div>
    </>
  )
}

export default MyEvents