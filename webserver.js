const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 3000;

try {
    // Esto arranca el motor de Ogar (necesitas la carpeta src)
    const Ogar = require('./src/index.js'); 
} catch (e) {
    console.log("Error: Falta la carpeta 'src' de Ogar en el repositorio.");
}

app.listen(port, () => {
    console.log("Servidor y Web listos en el puerto " + port);
});
