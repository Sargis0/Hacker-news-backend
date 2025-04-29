import tokenService from "../../business/services/token/TokenService.js";

export default class AuthMiddleware {
    static authenticate(request, response, next) {
        try {
            const authHeader = request.header("Authorization");

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return response.status(401).json({
                    success: false,
                    message: "Access denied. No token provided"
                });
            }

            const token = authHeader.split(" ")[1];

            if (!token) {
                return response.status(401).json({
                    success: false,
                    message: "Access token missing"
                });
            }

            const userData = tokenService.validateAccessToken(token);

            if (!userData) {
                return response.status(401).json({
                    success: false,
                    message: "Invalid or expired token"
                });
            }

            request.user = userData;
            next();
        } catch (error) {
            return response.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
    }
}
