const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 3000;

console.log("Iniciando motor...");

// Usamos path.join para que no haya error de carpetas
try {
    require(path.join(__dirname, 'src', 'index.js'));
    console.log("Motor cargado correctamente");
} catch (err) {
    console.log("ERROR CRITICO: No se pudo cargar el archivo src/index.js");
    console.log("Detalle del error: " + err.message);
    process.exit(1);
}

app.listen(port, () => {
    console.log("Servidor escuchando en puerto: " + port);
});
