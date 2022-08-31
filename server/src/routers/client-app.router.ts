import {Router} from "express";
import {ClientAppController} from "../controllers/client-app.controller";


const clientAppRouter: Router = Router();
clientAppRouter
    .get('/*', ClientAppController.getReactApp);

export {clientAppRouter}