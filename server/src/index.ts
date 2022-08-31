import {clientAppRouter} from "./routers/client-app.router";
import path from 'path';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require( 'cookie-parser');
const sequelize = require('./db');
const router = require('./routers/index');

const app = express();
const PORT = process.env.PORT;

app
    .use(express.json())
    .use(cors())
    .use(cookieParser())
    .use('/api', router)
    .use(express.static(path.join(__dirname, 'public')))
    .use('/', clientAppRouter);


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`SERVER LISTENING ON ${PORT}`) );
    } catch (e) {
        console.log(e)
    }

}

start();