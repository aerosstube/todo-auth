import {Router} from "express";
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const userRouter = Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.post('/logout',userController.logout);

userRouter.get('/refresh', userController.refresh);

module.exports = userRouter;