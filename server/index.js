const express= require("express")
const connection = require("./database/db.js")
const bodyParser = require("body-parser")

const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user")

const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api" , postRoutes)
app.use("/api" , userRoutes)

connection()

const PORT = 8000;
app.listen(PORT , () => {
    console.log(`Server Is Running On Port ${PORT}`)
})