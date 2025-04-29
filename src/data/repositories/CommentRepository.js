import CommentModel from "../models/comment.js"

class CommentRepository {
    async save(commentData) {
        return await CommentModel.create(commentData);
    }

    async findByNewsId(newsId) {
        return CommentModel.find({news: newsId})
            .populate({
                path: "author",
                select: "username",
                model: "User"
            })
            .populate({
                path: "replies",
                populate: {path: "author", select: "username"}
            })
            .sort({createdAt: -1});
    }

    async findById(commentId) {
        return CommentModel.findById(commentId);
    }

    async delete(commentId) {
        return CommentModel.findByIdAndDelete(commentId);
    }

    async update(commentId, text) {
        return CommentModel.findByIdAndUpdate(
            commentId,
            {text},
            {new: true}
        );
    }
}

export default new CommentRepository();
