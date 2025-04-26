import UserModel from "../models/user.js";

class UserRepository {
    async addEmail(id, email) {
        return UserModel.findOneAndUpdate(
            {_id: id},
            {$set: {email}},
            {new: true, runValidators: true}
        ).select("-password -refreshToken")
    }

    async emailExists(email) {
        return UserModel.findOne({email});
    }

    async findUser(userId) {
        return UserModel.findById(userId)
    }

    async about(data) {

    }
}

export default new UserRepository();