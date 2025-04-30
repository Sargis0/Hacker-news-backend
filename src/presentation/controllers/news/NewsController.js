import newsService from "../../../business/services/news/NewsService.js";
import {ResponseHelper} from "../../utils/ResponseHelper.js";

class NewsController {
    async create(request, response, next) {
        try {
            const newsData = {
                ...request.body,
                author: request.user.id
            }

            console.log(newsData)


            const result = await newsService.create(newsData);

            return response.status(201).json(ResponseHelper.createResponse({
                success: true,
                message: "News created successfully",
                data: result
            }));
        } catch (error) {
            next(error)
        }
    }

    async getAllPaginated(request, response, next) {
        try {
            const page = parseInt(request.query.page, 10) || 1;
            const limit = parseInt(request.query.limit, 10) || 30;

            const [news, totalCount] = await newsService.getAllPaginated(page, limit);
            const totalPages = Math.ceil(totalCount / limit);

            return response.status(200).json(ResponseHelper.createResponse({
                success: true,
                message: "News fetched successfully",
                data: {totalPages, totalCount, news}
            }));
        } catch (error) {
            next(error)
        }
    }
}

export default new NewsController();
