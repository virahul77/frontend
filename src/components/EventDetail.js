import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { backendUrl } from '../App';
import NavBar from './NavBar'
import PartEventDetails from './PartEventDetails';

const EventDetail = () => {
  const params = useParams();
  const eventId = params.eventId;
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