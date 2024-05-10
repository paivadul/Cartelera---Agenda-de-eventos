import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventData from "../hooks/EventData";
import SearchBar from "../hooks/SearchBar";
import '../inicio/inicio.css'
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');

const Inicio = () => {
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState([]);
    const navigate = useNavigate()

    const getAllEvents = () => {
        if (!token) {
            console.log('No se encontró un token en el localStorage');
            return;
        }

        axios.get('http://localhost:8000/api/event/events', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        })
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    console.log('Refrescar token y reintentar');
                }
            });
    };

    const handleSearch = (searchTerm) => {
        if (!token) {
            console.log('No se encontró un token en el localStorage');
            return;
        }

        axios.get(`http://localhost:8000/api/event/search/${searchTerm}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        })
            .then((response) => {
                setEvents(response.data);
                setMessage('No se encontraron eventos');
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    console.log('Refrescar token y reintentar');
                }
            });
    };

    const closeLogin = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        getAllEvents();
    }, []);

    return (
        <>
            <nav className="navbar">
                <h1>CARTELERA</h1>
                <div className="nav-links">
                    <SearchBar onSearch={handleSearch} />
                    <Link to="/event/new" className="link">Publicar evento</Link>
                    <button onClick={closeLogin} className="link">Cerrar Sesión</button>
                </div>
            </nav>
            {
                events && events.length > 0 ? (            
                    <div className="cont-events">
                        {Object.keys(events).map((key, i) => (
                            <EventData event={events[key]} key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="vacio">
                        <h1>No hay eventos disponibles</h1>
                    </div>
                ) 
            }
        </>
    );
}

export default Inicio;
