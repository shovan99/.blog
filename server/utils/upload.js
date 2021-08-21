const { GridFsStorage } = require("multer-gridfs-storage")
const multer = require("multer")

const storage = new GridFsStorage({
    url: "mongodb+srv://shovan99:shovan@cluster0.a11lt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    options: { useUnifiedTopology: true , useNewUrlParser: true },
    file: ( req , file ) => {
        const match = ["image/png" , "image/jpg"];
        if( match.indexOf(file.mimetype) === -1 ) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})


module.exports = multer(storage)