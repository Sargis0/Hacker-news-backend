import {Router} from "express";
import userController from "../controllers/user/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const userRouter = Router();

userRouter.patch(
    "/user/email",
    AuthMiddleware.authenticate,
    userController.updateEmail
);

userRouter.post("/user/password/reset-request", userController.requestPasswordReset);
userRouter.post("/user/password/reset-confirm", userController.confirmPasswordReset);

export default userRouter;
