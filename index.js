const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();
//Crear el servidor de express
const app = express();

//Directorio público
app.use(express.static('public'));

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
//TODO: auth // crear, login, renew
// TODO : CRUD : Eventos
app.use('/api/events', require('./routes/events'));
app.use('/api/labs', require('./routes/labs')); //laboratorios
app.use('/api/proyectos', require('./routes/projects')); //proyectos
app.use('/api/elementos', require('./routes/elements')); //elementos
app.use('/api/prestamos', require('./routes/prestamos')); //préstamos

// Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});