const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const {port, mongo_connection} = require('./src/config/secret');
require('./src/helpers/transaction.verify');
const app = express();

app.use(helmet());
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());

app.use(require('./src/routes'));

mongoose.connect(mongo_connection, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port, () => {
    console.log('Serviço iniciado com sucesso! Porta: ' + port)
});

