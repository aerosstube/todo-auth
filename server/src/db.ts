import { Sequelize } from 'sequelize-typescript';


// @ts-ignore
module.exports = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    models: [__dirname + '/models'],
    port: process.env.DB_PORT
});
