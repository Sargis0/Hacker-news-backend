import authService from "../../../business/services/auth/AuthService.js";
import {ResponseDto} from "../../dtos/response/ResponseDto.js";

class AuthController {
    async register(request, response) {
        try {
            const result = await authService.register(request.body);

            const dto = new ResponseDto({
                success: true,
                message: "User registered successfully",
                result
            });

            return response.status(201).json(dto);
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(request, response) {
        try {
            const {id, username, accessToken, refreshToken} = await authService.login(request.body);
            response.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return response.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    id,
                    username,
                    accessToken,
                    refreshToken
                }
            });
        } catch (error) {
            return response.status(400).json({
                success: false,
                error: error.message
            });
        }
    }

    async logout(request, response) {
        try {
            const {refreshToken} = request.cookies;
            await authService.logout(refreshToken);
            response.clearCookie("refreshToken");
            return response.status(204).end();
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async addEmail(request, response) {
        try {
            const {id} = request.params;
            const {email} = request.body;

            if (!email) {
                return response.status(400).json(
                    new ResponseDto({
                        success: false,
                        message: "Email is required"
                    })
                );
            }
            let result = await authService.addEmail(id, email);


            return response.status(200).json(
                new ResponseDto({
                    success: true,
                    message: "Email added successfully",
                    data: result
                })
            );
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default new AuthController();
