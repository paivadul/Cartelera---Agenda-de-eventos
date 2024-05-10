import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './userStyle.css';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleLogin = e => {
        e.preventDefault();
        axios.post(
            'http://localhost:8000/api/login',
            data,
            { withCredentials: true }
        )
        .then((response) => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/inicio');
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className="main-container">
            <div className="container">
                <h1>Iniciar Sesión</h1>
                <form className="form">
                    <label>
                        Correo electrónico:
                        <input required type="text" name="email" value={data.email || ""} onChange={onChangeHandler} />
                        {errors.email && <span>{errors.email}</span>}
                    </label>
                    <label>
                        Contraseña:
                        <input required type="password" name="password" value={data.password || ""} onChange={onChangeHandler} />
                        {errors.password && <span>{errors.password}</span>}
                    </label>
                    <div>
                        <button onClick={handleLogin} className="sendButton">Iniciar Sesión</button>
                    </div>
                </form>
                <Link className="link" to={`/register`}>¿Todavía no tienes una cuenta? Regístrate!</Link>
            </div>
        </div>
    );
}

export default LoginUser;
