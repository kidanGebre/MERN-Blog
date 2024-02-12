require("dotenv").config()
const express = require("express")
const bodyParser = require('body-parser')
const UserStatus = require('./Route/UserStatus')
const PostStatus = require('./Route/PostStatus')
const CommentStatus = require('./Route/CommentStatus')
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({ credentials: true, origin:"http://localhost:3000"}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/uploads', express.static(__dirname + '/uploads'))


mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`succesfully ${process.env.PORT}`)
    })
})

app.use('/user', UserStatus)
app.use('/post', PostStatus)
app.use('/comment',CommentStatus)