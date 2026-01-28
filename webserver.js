const express = require('express');
const app = express();
const path = require('path');

// 1. Servir la web
app.use(express.static(path.join(__dirname, 'web')));

// 2. Variable para el puerto de Render
const port = process.env.PORT || 3000;

// 3. Arrancar Ogar con manejo de errores real
try {
    console.log("Intentando arrancar el cerebro Ogar...");
    // Importamos Ogar
    const Ogar = require('./src/index.js');
} catch (e) {
    console.log("LOG DE ERROR: " + e.message);
}

// 4. Escuchar en el puerto de Render
app.listen(port, () => {
    console.log(">>> SERVIDOR VIVO EN PUERTO: " + port);
});
