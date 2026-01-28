const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 3000;

try {
    const Ogar = require('./src/index.js'); 
} catch (e) {
    console.log("Falta carpeta src");
}

app.listen(port, () => {
    console.log("Puerto: " + port);
});
