import UserModel from "../../models/user/user.js";

class AuthRepository {
    async save(data) {
        return await UserModel.create(data)
    }

    async findUser(username) {
        return UserModel.findOne({username});
    }

    async findUserById(userId) {
        return UserModel.findById(userId);
    }
}

export default new AuthRepository();
