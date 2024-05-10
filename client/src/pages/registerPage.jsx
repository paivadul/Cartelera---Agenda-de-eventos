import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import './userStyle.css';

const RegisterUser = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        setError({ ...error, [e.target.name]: '' });
    }

    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', data);
            console.log('response: ', response)
            if (response.data.data) {
                console.log('usuario registrado: ', response.data.data)
                setData({}); // Limpiar los datos después del registro
                navigate('/'); // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
            } else {
                console.error("Registro fallido: ", response.data.error);
                setError(response.data.error)
            }
        } catch (error) {
            if (error.response) {
                setError( 'Error en la carga de datos: ', error.response.data.error);
            } else {
                console.error(error.message);
            }
        }
    };

    return (
        <div className="main-container">
            <div className="container">
                <h1>Registrarse</h1>
                <form className="form">
                    <label>
                        Nombre:
                        <input required type="text" name="firstName" value={data.firstName || ""} onChange={onChangeHandler} />
                        {error.firstName && <span>{error.firstName}</span>}
                    </label>
                    <label>
                        Apellido:
                        <input required type="text" name="lastName" value={data.lastName || ""} onChange={onChangeHandler} />
                        {error.lastName && <span>{error.lastName}</span>}
                    </label>
                    <label>
                        Correo electrónico:
                        <input required type="email" name="email" value={data.email || ""} onChange={onChangeHandler} />
                        {error.email && <span>{error.email}</span>}
                    </label>
                    <label>
                        Contraseña:
                        <input required type="password" name="password" value={data.password || ""} onChange={onChangeHandler} />
                        {error.password && <span>{error.password}</span>}
                    </label>
                    <div>
                        <button onClick={onSubmitHandler} className="sendButton">Registrarse</button>
                    </div>
                </form>
                <Link className="link" to={`/`}>¿Ya tienes una cuenta? Inicia sesión!</Link>
            </div>
        </div>
    );
}

export default RegisterUser;
