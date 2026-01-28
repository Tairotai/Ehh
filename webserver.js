const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 3000;

try {
    console.log("Buscando el motor Ogar...");
    // Intentamos cargar el archivo principal de Ogar
    // Si falla uno, intentará el otro
    require('./src/index.js'); 
} catch (e) {
    try {
        require('./src/GameServer.js');
    } catch (err) {
        console.log("Error crítico: No se encontró el archivo de inicio en src. Error: " + err.message);
    }
}

app.listen(port, () => {
    console.log("Servidor Web corriendo en puerto: " + port);
});
