import NewsModel from "../../models/news/news.js";
import authRepository from "../auth/AuthRepository.js";

class NewsRepository {
    async save(newsData) {
        return await NewsModel.create(newsData)
    }

    async findUser(userId) {
        return await authRepository.findUserById(userId);
    }

    async getAllPaginated(page, limit) {
        const skip = (page - 1) * limit;
        const news = await NewsModel.find()
            .populate({
                path: "author",
                select: "username",
                model: "User"
            })
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1});

        const totalCount = await NewsModel.countDocuments();

        return [news, totalCount];
    }

    async remove(newsId) {

    }

    async update(newsId) {

    }
}

export default new NewsRepository();
