import commentService from "../../../business/services/comment/CommentService.js";
import {ResponseHelper} from "../../utils/ResponseHelper.js";

class CommentController {
    async create(request, response, next) {
        try {
            const commentData = {
                ...request.body,
                author: request.user.id,
                news: request.body.newsId
            };

            const result = await commentService.create(commentData);
            response.status(201).json(ResponseHelper.createResponse({
                success: true,
                message: "Comment created",
                data: result
            }));
        } catch (error) {
            next(error)
        }
    }

    async getByNewsId(request, response, next) {
        try {
            const comments = await commentService.getByNewsId(request.params.newsId);
            response.status(200).json(ResponseHelper.createResponse({
                success: true,
                data: comments
            }));
        } catch (error) {
            next(error);
        }
    }

    async delete(request, response, next) {
        try {
            await commentService.delete(request.params.commentId, request.user.id);
            response.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async update(request, response, next) {
        try {
            const result = await commentService.update(
                request.params.commentId,
                request.user.id,
                request.body.text
            );

            response.status(200).json(ResponseHelper.createResponse({
                success: true,
                data: result
            }));
        } catch (error) {
            next(error);
        }
    }
}

export default new CommentController();
