const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middlewares
app.use(express.json());
//Cookies
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Conexión a la base de datos
const connectDB = require('./config/config');
connectDB();

// User: login y register
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Eventos
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/event', eventRoutes);

app.listen(8000, () => {
    console.log("Servidor escuchando en el puerto 8000");
});