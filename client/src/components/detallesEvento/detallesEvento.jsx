import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams} from "react-router-dom";

//Envia el token
const token = localStorage.getItem('token');

const DetallesEvento = () => {
    const [event, setEvent] = useState({});

    const { id } = useParams();
    console.log('esto es el id', id)

    const getEventById = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/event/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('es de response data', response.data);
            setEvent(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getEventById();
    }, [id]);

    return (
        <>
            <nav className="navbar">
                <h1>CARTELERA</h1>
            </nav>
            <div className="cont-events">
                {/*1ra columna con el resumen descriptivo del evento*/}
                <div className='event-resume'>
                    <img src={event.visual} alt={event.nombre} className='event-image'></img>
                    <h1 className='event-name'>{event.nombre}</h1>
                        <div className='cont-event-details'>
                            <p>{event.descripcion}</p>
                            <Link to={"/inicio"} className='event-link'>Volver a inicio</Link>
                        </div>
                </div>
                {/*2ra columna con la data detallada del evento*/}
                <div className='event-info'>
                    <div>
                        <h4>Fecha del evento</h4>
                        <label>{event.fecha}</label>
                    </div>
                    <div>
                        <h4>Hora del evento</h4>
                        <label>{event.hora}</label>
                    </div>
                    <div>
                        <h4>Entradas</h4>
                        <label>{event.entradas}</label>
                    </div>
                    <div>
                        <h4>ubicacion</h4>
                        <label>{event.ubicacion}</label>
                    </div>
                    <div>
                        <h4>Contacto</h4>
                        <label>{event.contacto}</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetallesEvento;