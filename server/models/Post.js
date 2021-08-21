const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
})

const Post = mongoose.model("Post" , PostSchema);
module.exports = Post