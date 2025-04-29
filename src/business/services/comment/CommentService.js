import commentRepository from "../../../data/repositories/CommentRepository.js";
import {CommentDto} from "../../../presentation/dtos/response/CommentDto.js";
import {ApiError, NotFoundError} from "../../../presentation/errors/ApiError.js";

class CommentService {
    async create(commentData) {
        const comment = await commentRepository.save(commentData);
        if (!comment) throw new ApiError("Failed to create comment", 500);
        return new CommentDto(comment);
    }

    async getByNewsId(newsId) {
        const comments = await commentRepository.findByNewsId(newsId);
        return comments.map(comment => new CommentDto(comment));
    }


    async delete(commentId, userId) {
        const comment = await commentRepository.findById(commentId);
        if (!comment) throw new NotFoundError("Comment not found");
        if (comment.author.toString() !== userId) {
            throw new ApiError("Not authorized to delete this comment", 403);
        }
        await commentRepository.delete(commentId);
    }

    async update(commentId, userId, text) {
        const comment = await commentRepository.findById(commentId);
        if (!comment) throw new NotFoundError("Comment not found");
        if (comment.author.toString() !== userId) {
            throw new ApiError("Not authorized to edit this comment", 403);
        }
        const updatedComment = await commentRepository.update(commentId, text);
        return new CommentDto(updatedComment);
    }
}

export default new CommentService();