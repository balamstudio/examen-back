const express = require('express');

const cors = require('cors');


const { dbConnection } = require('./database/config');


const app = express();


app.use(cors());

app.use(express.json());


dbConnection();

app.use(express.static('public'));


app.use('/api/examen', require('./routes/examen.routes'));

app.use('/api/login', require('./routes/auth.routes'));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto ' + 3000);
});