import tokenService from "../../business/services/token/TokenService.js";
import {ApiError} from "../errors/ApiError.js";
import authRepository from "../../data/repositories/auth/AuthRepository.js"

export default class AuthMiddleware {
    static async authenticate(request, response, next) {
        try {
            const authHeader = request.header("Authorization");

            if (!authHeader?.startsWith("Bearer ")) {
                throw new ApiError("Unauthorized", 401);
            }

            const token = authHeader.split(" ")[1];
            const userData = tokenService.validateAccessToken(token);

            if (!userData) {
                throw new ApiError("Invalid token", 401);
            }

            const user = await authRepository.findUserById(userData.id);
            if (!user) {
                throw new ApiError("User not found", 404);
            }

            request.user = userData;
            next();
        } catch (error) {
            next(error);
        }
    }
}
