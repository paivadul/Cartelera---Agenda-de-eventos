const express = require('express');
const authRoutes = express.Router();
const userController = require('../controllers/userController');

//Ruta para registrarse
authRoutes.post('/register', userController.register);

// Ruta para iniciar sesión
authRoutes.post('/login', userController.login);

// Ruta para refresh
authRoutes.post('/refresh', userController.refresh);

module.exports = authRoutes;