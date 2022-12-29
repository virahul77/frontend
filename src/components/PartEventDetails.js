import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

const PartEventDetails = ({eventId}) => {
  const [event,setEvent] = useState({});
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
    <div>
        Participated Event Detail
    </div>
  )
}

export default PartEventDetails