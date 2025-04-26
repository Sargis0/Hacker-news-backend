import userRepository from "../../../data/repositories/UserRepository.js";
import {UserDto} from "../../../presentation/dtos/response/UserDto.js";

class UserService {
    async addEmail(id, email) {
        const emailExists = await userRepository.emailExists(email);
        if (emailExists) throw {message: "Email already in use"};

        const existUser = await userRepository.findUser(id);
        if (!existUser) throw {message: "User not found"};

        const updatedUser = await userRepository.addEmail(id, email);

        return new UserDto(updatedUser);
    }

    async about(id, data) {
        const existUser = await userRepository.findUser(id);
        if (!existUser) throw {message: "User not found"};

        return await userRepository.about(data);
    }
}

export default new UserService();