import {Router} from "express";
import commentController from "../controllers/comment/CommentController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const commentRouter = Router();

commentRouter.post("/", AuthMiddleware.authenticate, commentController.create);
commentRouter.get("/news/:newsId", commentController.getByNewsId);
commentRouter.delete("/:id", AuthMiddleware.authenticate, commentController.delete);
commentRouter.patch("/:id", AuthMiddleware.authenticate, commentController.update);

export default commentRouter;