import {ApiError} from "../errors/ApiError.js";

export class ErrorHandler {
    static handler(error, request, response, next) {
        if (error instanceof ApiError) {
            return response.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }

        return response.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
