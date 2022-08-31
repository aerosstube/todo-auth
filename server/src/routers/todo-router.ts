import {Router} from "express";
const todoController = require('../controllers/todo-controller');

const todoRouter = Router();

todoRouter.post('/add', todoController.addTodo);
todoRouter.get('/', todoController.getTodo);

module.exports = todoRouter;