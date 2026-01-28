const express = require('express');
const app = express();
const path = require('path');

// Esto muestra la página web
app.use(express.static(path.join(__dirname, 'web')));

// Esto arranca el juego (el cerebro que acabas de subir)
try {
    require('./src/index.js'); 
} catch (e) {
    console.log("Error al cargar el motor");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Todo listo en puerto: " + port);
});
