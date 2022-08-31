import Users from "../models/users";
import { Op } from "sequelize";
import Tokens from "../models/tokens";
const bcrypt = require("bcrypt");
const UserDto = require('../dtos/user-dto');
const tokenService = require('../services/token-service');

class UserService {
    async registration(login: string, password: string) {
        const candidate = await Users.findOne({
            where: {
                login
            }
        });

        if (candidate) {
            throw Error('Такой пользователь уже существует!');
        }

        const hashedPassword = await bcrypt.hash(password, 4);
        const user = await Users.create({
            login,
            password: hashedPassword
        });

        const userDto = new UserDto(user);

        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(tokens.refreshToken, user.id);
        return {
            ...tokens,
            user: userDto
        }
    }

    async login(login: string, password: string) {
        const candidate = await Users.findOne({
            where: {
                login
            }
        });

        if (!candidate) {
            throw Error('Логин или пароль неверный!');
        }

        if (!(await bcrypt.compare(password, candidate.password))) {
            throw Error('Логин или пароль неверный!');
        }

        const userDto = new UserDto(candidate);

        const tokens: Tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(tokens.refreshToken, candidate.id);
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(token: string) {
        if (!token) {
            throw Error('Вы не авторизованны!');
        }

        return await tokenService.removeToken(token);
    }

    async refresh(refreshToken: string){
        if(!refreshToken){
            throw Error('Вы не авторизованны!');
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = tokenService.findToken(refreshToken);

        if (!userData && !tokenFromDB) {
            throw Error('Вы не авторизованны!');
        }

        const user = await Users.findOne({
            where: {
                id: userData.id
            }
        });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(tokens.refreshToken, userDto.id);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();