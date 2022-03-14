const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
let bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = express();

const config = require('./config');

/**
 * Bootstrap DB Models
 */
let models = path.join(__dirname, 'models');
fs.readdirSync(models).forEach((file) => require(path.join(models, file)));


app.listen(config.port);

app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Origin',
            ' X-Requested-With',
            ' Content-Type',
            ' Accept ',
            ' Authorization',
        ],
        credentials: true,
        exposedHeaders: ['Content-Disposition'],
    }),
);
app.use(bodyParser.json({ limit: '50mb' }));


const file = require('./routes/file.route');
app.use('/files', file);

// mongoose.connect('mongodb://localhost/filesystem');
// TODO - Config from .env file

/**
 * Mongoose Configuration
 */
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('DATABASE - Connected');
});

mongoose.connection.on('error', (err) => {
    console.log('DATABASE - Error:' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('DATABASE - disconnected  Retrying....');
});

let connectDb = async function () {
    try {
        mongoose.connect(config.dbUrl)
    } catch (e) {
        console.log('DATABASE - Error:' + e);
    }
};
connectDb();
