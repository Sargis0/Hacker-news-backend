import jwt from "jsonwebtoken";

class TokenService {
    async generate(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: "7d"});
        return {accessToken, refreshToken};
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_TOKEN, {
                clockTolerance: 30,
                ignoreExpiration: false
            });
        } catch {
            return null;
        }
    }

    async validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
        } catch {
            return null;
        }
    }

    async saveToken(userId, refreshToken, deviceId) {
        return await tokenRepository.save(userId, refreshToken, deviceId);
    }

    async removeToken(refreshToken) {
        return await tokenRepository.remove(refreshToken);
    }

    async findToken(refreshToken, deviceId) {
        return await tokenRepository.find(refreshToken, deviceId);
    }
}

import tokenRepository from "../../../data/repositories/token/TokenRepository.js";

export default new TokenService();
