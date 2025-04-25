import {Router} from "express";
import newsController from "../controllers/news/NewsController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const newsRouter = Router();

newsRouter.post("/news",AuthMiddleware.authenticate, newsController.create);
newsRouter.get("/news", newsController.getAllPaginated);

export default newsRouter;
