const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
        nombre: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        fecha: {
            type: Date,
            required: true
        },
        hora: {
            type: String,
            required: true
        },
        entradas: {
            type: String,
            required: true
        },
        ubicacion: {
            type: String,
            required: true,
        },
        contacto: {
            type: String,
        },
        visual: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            required: true,
        }
});

const Evento = mongoose.model('Evento', EventoSchema);

module.exports = {
    Evento
};