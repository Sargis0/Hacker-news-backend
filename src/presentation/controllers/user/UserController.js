import userService from "../../../business/services/user/UserService.js";
import {ResponseHelper} from "../../utils/ResponseHelper.js";

class UserController {
    async updateEmail(request, response, next) {
        try {
            const {newEmail} = request.body;
            const result = await userService.updateEmail(request.user.id, newEmail);
            response.status(200).json(ResponseHelper.createResponse({
                success: true,
                data: result
            }));
        } catch (error) {
            next(error);
        }
    }

    async requestPasswordReset(request, response, next) {
        try {
            const {email} = request.body;
            await userService.requestPasswordReset(email);
            response.status(200).json(ResponseHelper.createResponse({
                success: true,
                message: "Reset link sent to your email"
            }));
        } catch (error) {
            next(error);
        }
    }

    async confirmPasswordReset(request, response, next) {
        try {
            const {token, newPassword} = request.body;
            await userService.resetPassword(token, newPassword);
            response.status(200).json(ResponseHelper.createResponse({
                success: true,
                message: "Password updated successfully"
            }));
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();