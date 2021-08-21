const express = require("express")
const router = express.Router()

const { createPost , getAllPosts , getPostById , updatePost , deletePostById , uploadFile , getImage , newComment, getCommentsByPostId } = require("../controllers/post")

const { isSignedIn , isAuthenticated , getUserById } = require("../controllers/user")

const upload = require("../utils/upload")

router.param("userId" , getUserById);

router.post("/post/create" , isSignedIn , createPost)

router.get("/posts" , getAllPosts)

router.get("/post/:id" , getPostById)

router.put("/post/:id" , isSignedIn , isAuthenticated , updatePost)

router.delete("/post/:id/:userId" , deletePostById)

router.post("/file/upload" , upload.single("file") , uploadFile)

router.get("/comments/:id", getCommentsByPostId)

// router.get("/file/:filename" , getImage)

router.post("/comment/new" , newComment)

module.exports = router