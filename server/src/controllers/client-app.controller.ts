import path from "path";
import {NextFunction, Request, Response} from 'express';


export class ClientAppController {
    static async getReactApp(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendFile(path.join(__dirname, '../public/', 'index.html'));
        } catch (err) {
            next(err);
        }
    }
}
