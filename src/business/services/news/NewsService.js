import newsRepository from "../../../data/repositories/NewsRepository.js";

class NewsService {
    async create(newsData) {
        let existingUser = await newsRepository.findUser(newsData.author);
        if (!existingUser) {
            return {
                success: false,
                message: "User not found"
            }
        }

        return await newsRepository.save(newsData);
    }

    async getAllPaginated(page, limit) {
        return await newsRepository.getAllPaginated(page, limit)
    }
}

export default new NewsService();
