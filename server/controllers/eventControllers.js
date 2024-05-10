const express = require('express');
const { Evento } = require('../models/Event');

// Función para formatear el evento antes de guardarlo en la base de datos
const EventoSchema = evento => ({
    nombre: evento.nombre,
    descripcion: evento.descripcion,
    fecha: evento.fecha,
    hora: evento.hora,
    entradas: evento.entradas,
    ubicacion: evento.ubicacion,
    contacto: evento.contacto,
    visual: evento.visual,
    tipo: evento.tipo
});

// Controlador para crear un nuevo evento
const createNewEvent = (req, res) => {
    const eventoEnviado = EventoSchema(req.body); 
    Evento.create(eventoEnviado)
        .then(evento => {
            // Enviar la respuesta al cliente
            res.status(201).json(evento);
        })
        .catch(err => {
            console.error('Error al crear un nuevo evento:', err);
            res.status(400).json({ error: err.message }); // Devolver un estado 400 en caso de error de validación
        });
};

// Controlador para obtener todos los eventos
const getAllEvent = async (req, res) => {
    try {
        const events = await Evento.find(); // Obtener todos los eventos de la colección Evento
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un evento por su ID
const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Evento.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Controlador para actualizar un evento
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const eventoEnviado = EventoSchema(req.body);
    try {
        const updatedEvent = await Evento.findByIdAndUpdate(id, eventoEnviado, { new: true })
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' })
        }
        res.status(200).json(updatedEvent)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Controlador para eliminar un evento
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Evento.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' })
        }
        res.status(200).json({ message: 'Event deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

//PARA EL BUSCADOR
const searchEvents = async (req, res) => {
    const { message } = req.params;

    try {
        let query = {};

        // Verificar si el mensaje coincide con alguno de los tipos de evento predefinidos
        const tiposDeEvento = ['musica', 'teatro', 'danza'];
        const isType = tiposDeEvento.includes(message.toLowerCase());

        if (isType) {
            query.tipo = { $regex: new RegExp(message, 'i') };
        } else {
            query.nombre = { $regex: new RegExp(message, 'i') };
        }

        const events = await Evento.find(query);

        res.status(200).json(events);
    } catch (error) {
        console.error('Error al buscar eventos:', error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createNewEvent,
    getAllEvent,
    getEventById,
    updateEvent,
    deleteEvent,

    searchEvents
};