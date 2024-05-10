const express = require('express');
const eventRoutes = express.Router();
const {verifyToken} = require('../utils/auth');

const { createNewEvent, getAllEvent, getEventById, updateEvent, deleteEvent, searchEvents } = require("../controllers/eventControllers");

eventRoutes.post('/new', verifyToken, createNewEvent);
eventRoutes.get('/events', verifyToken, getAllEvent);
eventRoutes.get('/:id', verifyToken, getEventById);
eventRoutes.put('/event/update/:id', verifyToken, updateEvent);
eventRoutes.delete('/event/delete/:id', verifyToken, deleteEvent);


//PARA EL BUSCADOR
eventRoutes.get('/search/:message', verifyToken, searchEvents);

module.exports = eventRoutes;