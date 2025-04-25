import jwt from "jsonwebtoken";
import tokenRepository from "../../../data/repositories/TokenRepository.js";

class TokenService {
    async generate(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: "15m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: "7d"});
        return {accessToken, refreshToken}
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
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

    async saveToken(userId, refreshToken) {
        return await tokenRepository.save(userId, refreshToken);
    }

    async removeToken(refreshToken) {
        return await tokenRepository.remove(refreshToken);
    }

    async findToken(refreshToken) {
        return await tokenRepository.find(refreshToken);
    }
}

export default new TokenService();
