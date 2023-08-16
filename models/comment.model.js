const { Schema, model } = require("mongoose");


const commentSchema = new Schema({

client: String,
note: String

})

const Comment = model("Comment", commentSchema)

module.exports = Comment;