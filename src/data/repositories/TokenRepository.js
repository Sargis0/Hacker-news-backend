import TokenModel from "../models/token.js";

class TokenRepository {
    async save(userId, refreshToken) {
        const existing = await TokenModel.findOne({user: userId});
        if (existing) {
            existing.refreshToken = refreshToken;
            return await existing.save();
        }

        return await TokenModel.create({
            user: userId,
            refreshToken
        });
    }

    async remove(refreshToken) {
        return TokenModel.deleteOne({refreshToken});
    }

    async find(refreshToken) {
        return TokenModel.findOne({refreshToken});
    }
}

export default new TokenRepository();
