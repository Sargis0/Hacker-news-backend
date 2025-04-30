import "dotenv/config";
import express from "express";
import http from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";

import {MongoClient} from "./infrastructures/config/Database.js";
import {ErrorHandler} from "./presentation/middlewares/ErrorHandler.js";

import authRouter from "./presentation/routes/authRouter.js";
import newsRouter from "./presentation/routes/newsRouter.js";
import userRouter from "./presentation/routes/userRouter.js";
import commentRouter from "./presentation/routes/commentRouter.js";

class App {
    #dbClient;

    constructor() {
        this.expressApp = express();
        this.server = http.createServer(this.expressApp);
        this.#dbClient = new MongoClient();
        this.setupMiddleware();
    }

    setupMiddleware() {
        this.expressApp.use(cors({
            origin: ["http://localhost:5173"],
            methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
        this.expressApp.use(express.json());
        this.expressApp.use(cookieParser())
        this.expressApp.use("/api", authRouter);
        this.expressApp.use("/api", newsRouter);
        this.expressApp.use("/api", userRouter);
        this.expressApp.use("/api", commentRouter);
        this.expressApp.use(ErrorHandler.handler);
    }

    async start() {
        try {
            this.#dbClient.connect(`${process.env.MONGO_URL}/${process.env.DATABASE_NAME}`);

            this.server.listen(process.env.PORT, () => {
                console.log(`Server running on http://localhost:${process.env.PORT}`);
            })
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}

(async () => {
    const app = new App();
    await app.start();
})();
