import authService from "../../../business/services/auth/AuthService.js";
import {ResponseHelper} from "../../utils/ResponseHelper.js";
import tokenService from "../../../business/services/token/TokenService.js";
import DeviceDetector from "../../utils/DeviceDetector.js";

class AuthController {
    async register(request, response, next) {
        try {
            const result = await authService.register(request.body);
            return response.status(201).json(ResponseHelper.createResponse({
                success: true,
                message: "User registered successfully",
                data: result
            }));
        } catch (error) {
            next(error)
        }
    }

    async login(request, response, next) {
        try {
            const deviceId = DeviceDetector.generateDeviceId(request);

            const {id, username, accessToken, refreshToken} = await authService.login(request.body, deviceId);
            await tokenService.saveToken(id, refreshToken, deviceId);

            response.cookie("refreshToken", refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return response.status(200).json(ResponseHelper.createResponse({
                success: true,
                message: "Login successful",
                data: {id, username, accessToken}
            }));
        } catch (error) {
            next(error);
        }
    }

    async logout(request, response, next) {
        try {
            const {refreshToken} = request.cookies;
            await authService.logout(refreshToken);
            response.clearCookie("refreshToken");
            return response.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(request, response, next) {
        try {
            const {refreshToken} = request.cookies;
            const deviceId = DeviceDetector.generateDeviceId(request);
            const tokens = await authService.refreshTokens(refreshToken, deviceId);

            response.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return response.status(200).json(ResponseHelper.createResponse({
                success: true,
                data: {accessToken: tokens.accessToken}
            }));
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
