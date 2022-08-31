import Tokens from "../models/tokens";

const jwt = require('jsonwebtoken');

class TokenService {
    generateToken(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(token: string, userId: number) {
        const tokenData = await Tokens.findOne({
            where: {
                userId
            }
        });

        if (tokenData) {
            tokenData.refreshToken = token;
            return tokenData.save()
        }
        
        return await Tokens.create({
            refreshToken: token,
            userId
        });
    }

    async removeToken(token: string) {
        return await Tokens.destroy({
            where: {
                refreshToken: token
            }
        });
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            throw Error('Неверный токен');
        }
    }

    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            throw Error('Неверный токен');
        }
    }

    async findToken(token: string){
        return await Tokens.findOne({
            where: {
                refreshToken: token
            }
        });
    }


}

module.exports = new TokenService();