import newsRepository from "../../../data/repositories/news/NewsRepository.js";
import {NewsDto} from "../../../presentation/dtos/response/NewsDto.js";
import {ApiError, NotFoundError} from "../../../presentation/errors/ApiError.js";

class NewsService {
    async create(newsData) {
        let existingUser = await newsRepository.findUser(newsData.author);
        if (!existingUser) {
            throw new NotFoundError("User not found");
        }

        const savedNews = await newsRepository.save(newsData);

        if (!savedNews) {
            throw new ApiError("Failed to save news", 500);
        }

        return new NewsDto(savedNews)

    }

    async getAllPaginated(page, limit) {
        try {
            const [news, totalCount] = await newsRepository.getAllPaginated(page, limit);
            return [news, totalCount]
        } catch {
            return [[], 0];
        }
    }
}

export default new NewsService();
