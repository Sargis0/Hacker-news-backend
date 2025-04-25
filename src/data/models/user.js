import {Schema, model} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
    strict: true,
});

export default model("User", userSchema);
