const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

connectDB(); // Conectar a la base de datos

app.use('/api/users', userRoutes); // Definir rutas

module.exports = app;