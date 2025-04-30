import userRepository from "../../../data/repositories/UserRepository.js";
import {UserDto} from "../../../presentation/dtos/response/UserDto.js";
import {ApiError, NotFoundError} from "../../../presentation/errors/ApiError.js";
import emailService from "../../../infrastructures/EmailService.js";
import crypto from "crypto";

class UserService {
    async updateEmail(userId, newEmail) {
        const user = await userRepository.findUserById(userId);
        if (!user) throw new NotFoundError("User not found");

        if (newEmail === user.email) {
            throw new ApiError("New email must be different", 400);
        }

        user.email = newEmail;
        await user.save();
        return new UserDto(user);
    }

    async requestPasswordReset(email) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("Email not found");

        const token = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000;
        await user.save();

        const resetLink = `https://your-app.com/reset-password?token=${token}`;
        await emailService.send({
            to: user.email,
            subject: "Password Reset Request",
            text: `Click to reset your password: ${resetLink}`
        });

        return {success: true};
    }

    async resetPassword(token, newPassword) {
        const user = await userRepository.findByResetToken(token);
        if (!user || user.passwordResetExpires < Date.now()) {
            throw new BadRequestError("Invalid or expired token");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.passwordResetToken = null; // Ջնջել token-ը
        user.passwordResetExpires = null;
        await user.save();

        return {success: true};
    }

    // async about(id, data) {
    //     const existUser = await userRepository.findUser(id);
    //     if (!existUser) throw {message: "User not found"};
    //
    //     return await userRepository.about(data);
    // }
}

export default new UserService();
