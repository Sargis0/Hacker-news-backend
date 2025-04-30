import UserModel from "../models/user.js";

class UserRepository {
    async save(data) {
        return await UserModel.create(data);
    }

    async findUser(username) {
        return UserModel.findOne({ username });
    }

    async findUserById(userId) {
        return UserModel.findById(userId);
    }

    async findByEmail(email) {
        return UserModel.findOne({ email });
    }

    async findByResetToken(token) {
        return UserModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
    }

    async updateUser(userId, updateData) {
        return UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async getUserProfile(userId) {
        return UserModel.findById(userId).select('-password -passwordResetToken');
    }
}

export default new UserRepository();