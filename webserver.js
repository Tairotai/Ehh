const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 3000;

console.log("Cargando motor desde: ./src/index.js");

// Si esto falla, Render nos dará el error real en el log
require('./src/index.js');

app.listen(port, () => {
    console.log("WEB Y MOTOR LISTOS EN PUERTO: " + port);
});
