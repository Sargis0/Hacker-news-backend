import UserModel from "../models/user.js";

class AuthRepository {
    async save(data) {
        return await UserModel.create(data)
    }

    async findUser(username) {
        return UserModel.findOne({username});
    }

    async addEmail(id, email) {
        return UserModel.findOneAndUpdate(
            id,
            {$set: {email}},
            {new: true, runValidators: true}
        ).select("-password -refreshToken")
    }

    async emailExists(email) {
        return UserModel.findOne({email});
    }
}

export default new AuthRepository();
