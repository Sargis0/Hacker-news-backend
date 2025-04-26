import {Router} from "express";
import userController from "../controllers/user/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const userRouter = Router();

userRouter.patch(
    "/user/email",
    AuthMiddleware.authenticate,
    userController.addEmail
);

userRouter.patch("/user/about", AuthMiddleware.authenticate, userController.about)

export default userRouter;