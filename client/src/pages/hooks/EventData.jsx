import React from 'react'
import { Link } from 'react-router-dom'
import '../inicio/inicio.css'

const EventData = ({ event }) => {

    return (
        <div className='event-card'>
            <img src={event.visual} alt={event.nombre} className='event-image'></img>
            <div className='event-info'>
                <h4 className='event-name'>{event.nombre}</h4>
                <p className='event-description'>{event.descripcion}</p>
                <Link to={`/event/${event._id}`} className='event-link'>Go</Link>
            </div>
        </div>
    )
}

export default EventData;