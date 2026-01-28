const express = require('express');
const app = express();
const path = require('path');

// Servir los archivos de la carpeta 'web'
app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 3000;

try {
    console.log("Iniciando motor Ogar...");
    // Simplemente llamamos al index del motor. 
    // Él mismo leerá el process.env.PORT que Render le da.
    require('./src/index.js');
} catch (e) {
    console.log("Error al cargar el motor: " + e.message);
}

app.listen(port, () => {
    console.log("Servidor Web y Ogar listos en puerto: " + port);
});
