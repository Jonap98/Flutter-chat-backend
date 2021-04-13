const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config
const { dbConnection } = require('./database/config');
dbConnection();

// Creando una aplicación de express
const app = express();

// Configurando la lectura de la información que viene en el body de una 
// petición http
app.use(express.json());

// Servidor Node
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




//Path público 
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis rutas
app.use('/api/login', require('./routes/auth'));

// Escuchando en algún puerto, llamando un callback
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});