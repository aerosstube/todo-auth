import express from "express";

const userService = require('../services/user-service');

class UserController {
    async registration(req: express.Request, res: express.Response, next: Function) {
        try {
            const { login, password } = req.body;

            const user = await userService.registration(login, password);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async login(req: express.Request, res: express.Response, next: Function) {
        try {
            const { login, password } = req.body;
            const user = await userService.login(login, password);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(user);
        } catch (e) {
            next(e)
        }
    }

    async logout(req: express.Request, res: express.Response, next: Function) {
        try {
            const token = await userService.logout(req.cookies.refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: express.Request, res: express.Response, next: Function) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();