import bcrypt from "bcryptjs";
import authRepository from "../../../data/repositories/auth/AuthRepository.js";
import tokenService from "../token/TokenService.js";
import {UserDto} from "../../../presentation/dtos/response/UserDto.js";
import {ApiError, BadRequestError} from "../../../presentation/errors/ApiError.js";

class AuthService {
    async register(data) {
        const {username, password} = data;

        const existingUser = await authRepository.findUser(username);
        if (existingUser) {
            throw new BadRequestError("User already exist")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await authRepository.save({username, password: hashedPassword});

        return new UserDto(newUser)
    }

    async login(data, deviceId) {
        const {username, password} = data;

        const user = await authRepository.findUser(username);
        if (!user) {
            throw new BadRequestError("Invalid username or password", 400);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestError("Invalid username or password");
        }

        const userDto = new UserDto(user);

        const tokens = await tokenService.generate({...userDto});
        await tokenService.saveToken(user._id, tokens.refreshToken, deviceId);
        return {
            ...userDto, ...tokens
        };
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refreshTokens(refreshToken, deviceId) {
        if (!refreshToken || !deviceId) {
            throw new BadRequestError("Invalid request");
        }

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken, deviceId);

        if (!userData || !tokenFromDb) {
            throw new ApiError("Invalid refresh token", 401, {
                clearCookie: true
            });
        }

        if (userData.deviceId !== deviceId) {
            await tokenService.removeToken(refreshToken);
            throw new ApiError("Device mismatch", 403);
        }

        const tokens = await tokenService.generate(
            {id: userData.id, username: userData.username},
            deviceId
        );
        await tokenService.saveToken(userData.id, tokens.refreshToken);
        return tokens;
    }
}

export default new AuthService();
