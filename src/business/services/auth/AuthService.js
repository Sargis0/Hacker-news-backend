import bcrypt from "bcryptjs";
import authRepository from "../../../data/repositories/AuthRepository.js";
import tokenService from "../token/TokenService.js";
import {UserDto} from "../../../presentation/dtos/response/UserDto.js";

class AuthService {
    async register(data) {
        const {username, password} = data;

        const existingUser = await authRepository.findUser(username);
        if (existingUser) throw {message: "User already exist"};

        const hashedPassword = await bcrypt.hash(password, 10);
        return await authRepository.save({username, password: hashedPassword});
    }

    async login(data) {
        const {username, password} = data;

        const user = await authRepository.findUser(username);
        if (!user) throw {message: "Invalid username or password"};

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw {message: "Invalid username or password"};

        const userDto = new UserDto(user);

        const tokens = await tokenService.generate({...userDto});
        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {
            ...userDto, ...tokens
        };
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async addEmail(id, email) {
        const emailExists = await authRepository.emailExists(email);
        if (email) {
            throw {message: "Email already in use"}
        }

        const updatedUser = await authRepository.addEmail(id, email);
        if (!updatedUser) {
            throw {message: "User not found"};
        }

        return new UserDto(updatedUser);
    }
}

export default new AuthService();
