import {Schema, model} from "mongoose";

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: "News",
        required: false,
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
    strict: true,
});

export default model("Comment", commentSchema);
