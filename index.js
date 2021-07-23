const express = require('express'); // Express
require('dotenv').config(); // Para hacer uso de las variables de .env
const { dbConnection } = require('./database/config');
const cors = require('cors'); // Importamos el cors

// console.log(process.env); // Para ver las variables de entorno en consola

// Crear el servidor de Express
const app = express();

// Base de datos
dbConnection();

// CORS, capa de seguridad
app.use(cors());

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth')); // Autenticación
app.use('/api/events', require('./routes/events')); // Eventos


// Escuchar peticiones a través del puerto asignado en las variables de .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puesto ${ process.env.PORT }`);
})