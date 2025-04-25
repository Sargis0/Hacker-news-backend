import newsService from "../../../business/services/news/NewsService.js";
import {response} from "express";
import {parse} from "dotenv";

class NewsController {
    async create(request, response) {
        try {
            const newsData = request.body;
            newsData.author = request.user.id;
            const result = await newsService.create(newsData);

            return response.status(201).json({
                success: true,
                message: "News added successfully",
                result
            })
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async getAllPaginated(request, response) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 30;

            const [allNews, totalCount] = await newsService.getAllPaginated(page, limit);
            const totalPages = Math.ceil(totalCount / limit);

            return response.status(200).json({
                success: true,
                currentPage: page,
                totalPages,
                totalCount,
                news: allNews
            })
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default new NewsController();
