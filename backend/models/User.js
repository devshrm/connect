import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: { 
            type: String,
            required: true,
        },
        lastName: { 
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        picturePath: {
            type: String,
            default: ""
        },
        following: {
            type: Array,
            default: []
        },
        followers: {
            type: Array,
            default: []
        },
        location: String,
        likedPosts: {
            type: Array,
            default: []
        },
        comments: {
            type: Array,
            default: []
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;