const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title: { type: String, required: true },
    summary: { type: String, required: true },
    catagory: {
        type: String,
        enums: [ " News", "Culture", "History", "Science", "Fact" ],
        default:'News',
        required: true
    },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    view:{type:Number,default:0},
    like: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ]
}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema)

const CommentSchema = mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true },
    like: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ]
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema)

const ReplySchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    reply: { type: String, required: true },
    like: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ]
}, { timestamps: true })

const Reply = mongoose.model("Reply", ReplySchema)

module.exports = {Post,Comment,Reply}
