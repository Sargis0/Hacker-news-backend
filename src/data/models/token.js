import {Schema, model} from "mongoose";

const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    strict: true,
});

export default model("Token", tokenSchema);
