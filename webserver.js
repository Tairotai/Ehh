const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'web')));
const port = process.env.PORT || 3000;
process.env.PORT = port; 

try {
    require('./src/index.js');
} catch (e) {
    console.log("Error: " + e.message);
}

app.listen(port, () => {
    console.log("Server port: " + port);
});
