import tokenService from "../../business/services/token/TokenService.js";

export default class AuthMiddleware {
    static authenticate(request, response, next) {
        const token = request.header("Authorization")?.replace("Bearer", "").trim();

        if (!token) {
            return response.status(401).json({
                success: false,
                message: "Access denied. No token provided",
            });
        }

        const userData = tokenService.validateAccessToken(token);

        if (!userData) {
            return response.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        request.user = userData;
        next();
    }
}
