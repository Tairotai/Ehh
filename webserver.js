const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 3000;

try {
    // Esto es lo más importante: le pasamos el puerto de Render a Ogar
    const Ogar = require('./src/index.js');
    // Forzamos a que Ogar use el puerto que Render nos da
    if (Ogar && Ogar.config) Ogar.config.serverPort = port;
} catch (e) {
    console.log("Error al cargar el motor: " + e.message);
}

app.listen(port, () => {
    console.log("Servidor Web y Ogar listos en puerto: " + port);
});
