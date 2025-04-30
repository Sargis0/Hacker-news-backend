import {Router} from "express";
import commentController from "../controllers/comment/CommentController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const commentRouter = Router();

commentRouter.post("/comment", AuthMiddleware.authenticate, commentController.create);
commentRouter.get("/news/:newsId", commentController.getByNewsId);
commentRouter.delete("/:commentId", AuthMiddleware.authenticate, commentController.delete);
commentRouter.patch("/:commentId", AuthMiddleware.authenticate, commentController.update);

export default commentRouter;