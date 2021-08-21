const Post = require("../models/Post")
const grid = require("gridfs-stream")

const Comment = require("../models/Comment")

const mongoose = require("mongoose")

exports.createPost = async( req , res ) => {
    const post = new Post(req.body)
    await post.save(( err , post ) => {
        if( err ) {
            return res.status(500).json({
                error: "Unable To Save Post"
            })
        }
        res.json({
            message: `${post.title} Saved Into DB`
        })
    })
}

exports.getAllPosts = async( req , res ) => {
    const username = req.query.username
    const category = req.query.category
    let posts;
    try {
    if(username)
        posts = await Post.find({ username: username })
    else if(category)
        posts = await Post.find({ categories: req.query.category })
    else
        posts = await Post.find({})
    return res.json(posts)
    } catch( err ) {
        res.json({
            error: "Unable To Get Posts"
        })
    }
}


exports.getPostById = async( req , res ) => {
    try {
        const post = await Post.findById({_id: req.params.id})
        return res.json(post)
    } catch( err ) {
        res.json({
            error: "Unable To Get Post"
        })
    }
}


exports.updatePost = async( req , res ) => {
    try{
        await Post.findByIdAndUpdate(req.params.id , {$set: req.body} , {$new: true , useFindAndModify: false}) 
        res.json("Post Updated")
    }catch( err ) {
        res.json({
            error: "Unable To Update Post"
        })
    }
}


exports.deletePostById = async( req , res ) => {
    try{
        const post = await Post.findById(req.params.id)
        await post.delete()
        res.json("Post Removed")
    }catch( err ) {
        res.json({
            error: "Unable To Delete Post"
        })
    }
}

const url = "http://localhost:8000/api"
const conn = mongoose.connection
let gfs;
conn.once("open" , () => {
    gfs = grid(conn.db , mongoose.mongo);
    gfs.collection("fs")
})

exports.uploadFile = async( req , res ) => {
        if( !req.file ) {
            return res.status(400).json({
                errors: "No File Is Found"
            })
        }
        const imageURL = `${url}/file/${req.file.filename}`
        res.json(imageURL)
}

// exports.getImage = async( req , res ) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename })
//         const readStream = gfs.createReadStream(file.filename)
//         readStream.pipe(res)
//     }catch( err ) {
//         console.log(err)
//     }
// }

exports.newComment = ( req , res ) => {
    try {
        const comment = new Comment(req.body);
        comment.save()
        res.json({
            message: "Comment Saved"
        })
    }catch( err ) {
        res.json({
            error: "Unable To Save Comment"
        })
    }
}

exports.getCommentsByPostId = async( req , res ) => {
    const comments = await Comment.find({ postId: req.params.id }).sort([[ "date" , -1 ]])
    res.json(comments)
    console.log(comments)
}