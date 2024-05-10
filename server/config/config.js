const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/carteleradb');
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;