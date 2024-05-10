import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './publicarEvento.css'

const token = localStorage.getItem('token');

const PublicarEvento = () => {
    const [data, setData] = useState({
        nombre: '',
        descripcion: '',
        fecha: '',
        hora: '',
        entradas: '',
        ubicacion: '',
        contacto: '',
        visual: '',
        tipo: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const EventHandler = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setErrors({ ...errors, [name]: '' });
        console.log(data)
    };

    const closeLogin = () => {
        localStorage.removeItem('token');
        console.log('datos cargados: ', data)
    };

    const sendEventHandler = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/event/new', data, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData({
                nombre: '',
                descripcion: '',
                fecha: '',
                hora: '',
                entradas: '',
                ubicacion: '',
                contacto: '',
                visual: '',
                tipo: ''
            });
            navigate('/inicio');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error al enviar los datos del evento:', error.message);
                // Puedes establecer un error general si el objeto de errores esperado no existe
                setErrors({ general: "Error al enviar los datos. Por favor, intente nuevamente." });
            }
        }
    };

    return (
        <>
            <nav className="navbar">
                <h1>CARTELERA</h1>
                <Link to="/inicio" className="link">Volver a inicio</Link>
                <button onClick={closeLogin} className="link">Cerrar Sesión</button>
            </nav>
            <form className="container" onSubmit={sendEventHandler}>
                <h1>Publicar evento</h1>
                <label>
                    Nombre del evento:
                    <input required
                        type="text"
                        name="nombre"
                        value={data && data?.nombre || ''}
                        onChange={EventHandler} />
                    {errors.nombre && <span className="error">{errors.nombre}</span>}
                </label>
                <label>
                    Breve reseña:
                    <input required
                        type="text"
                        name="descripcion"
                        value={data && data?.descripcion || ''}
                        onChange={EventHandler} />
                    {errors.descripcion && <span className="error">{errors.descripcion}</span>}
                </label>
                <label>
                    Fecha del evento:
                    <input required
                        type="date"
                        name="fecha"
                        value={data && data?.fecha || ''}
                        onChange={EventHandler} />
                    {errors.fecha && <span className="error">{errors.fecha}</span>}
                </label>
                <label>
                    Horario del evento:
                    <input required
                        type="time"
                        name="hora"
                        value={data && data?.hora || ''}
                        onChange={EventHandler} />
                    {errors.hora && <span className="error">{errors.hora}</span>}
                </label>
                <label>
                    Valor de las entradas:
                    <input required
                        type="number"
                        name="entradas"
                        value={data && data?.entradas || ''}
                        onChange={EventHandler} />
                    {errors.entradas && <span className="error">{errors.entradas}</span>}
                </label>
                <label>
                    Lugar donde se realizará el evento:
                    <input required
                        type="text"
                        name="ubicacion"
                        value={data && data?.ubicacion || ''}
                        onChange={EventHandler} />
                    {errors.ubicacion && <span className="error">{errors.ubicacion}</span>}
                </label>
                <label>
                    Contacto:
                    <input required
                        type="tel"
                        name="contacto"
                        value={data && data?.contacto || ''}
                        onChange={EventHandler} />
                    {errors.contacto && <span className="error">{errors.contacto}</span>}
                </label>
                <label>
                    Material visual (en formato link):
                    <input required
                        type="url"
                        name="visual"
                        value={data && data?.visual || ''}
                        onChange={EventHandler} />
                    {errors.visual && <span className="error">{errors.visual}</span>}
                </label>
                <label>
                    Tipo de evento:
                    <input
                        type="text"
                        name="tipo"
                        value={data && data?.tipo || ''}
                        onChange={EventHandler} />
                    {errors.tipo && <span className="error">{errors.tipo}</span>}
                </label>
                <button type="submit" className="sendButton">Publicar Evento</button>
            </form>
        </>
    );

};

export default PublicarEvento;