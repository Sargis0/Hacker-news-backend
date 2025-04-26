import TokenModel from "../models/token.js";

class TokenRepository {
    async save(userId, refreshToken, deviceId) {
        const existing = await TokenModel.findOne({user: userId, deviceId});
        if (existing) {
            existing.refreshToken = refreshToken;
            return await existing.save();
        }

        return await TokenModel.create({
            user: userId,
            deviceId,
            refreshToken
        });
    }

    async remove(refreshToken) {
        return TokenModel.deleteOne({refreshToken});
    }

    async find(refreshToken, deviceId) {
        return TokenModel.findOne({refreshToken, deviceId});
    }
}

export default new TokenRepository();
