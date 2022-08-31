import express from "express";
const tokenService = require('../services/token-service');

module.exports = function (req: any, res: express.Response, next: Function) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(res.json(new Error('Не авторизован').message));
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(res.json(new Error('Не авторизован').message));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(res.json(new Error('Не авторизован').message));
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(res.json(new Error('Не авторизован').message));
    }
}