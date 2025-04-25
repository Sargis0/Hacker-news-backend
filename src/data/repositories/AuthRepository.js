import UserModel from "../models/user.js";

class AuthRepository {
    async save(data) {
        return await UserModel.create(data)
    }
    
    async findUser(username) {
        return UserModel.findOne({username});
    }
}

export default new AuthRepository();
