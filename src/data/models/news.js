import {Schema, model} from "mongoose";

const newsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    points: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
    strict: true,
});

export default model("News", newsSchema);
