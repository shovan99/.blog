const mongoose = require("mongoose")


const connection = async() => {
    const URL = `mongodb+srv://shovan99:shovan@cluster0.a11lt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    await mongoose.connect(URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false , useCreateIndex: true })
    .then(() => {
        console.log("Database Connected");
    })
    .catch(() => {
        console.log("Database Is Not Connected")
    })
}


module.exports = connection