import {Router} from "express";
import authController from "../controllers/auth/AuthController.js";

const authRouter = Router();

authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/login", authController.login);
authRouter.post("/auth/logout", authController.logout);
authRouter.patch("/auth/:id/email", authController.addEmail);

export default authRouter;
