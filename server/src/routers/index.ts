const {Router} = require("express");
const todoRouter = require('./todo-router');
const userRouter = require('./user-router');

const routers = Router();

routers.use('/todo', todoRouter);
routers.use('/user', userRouter);

module.exports = routers;