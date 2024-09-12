const{ Schema, model } = require("mongoose")

const commentSchema = new Schema({
    book_id: { type: Schema.Types.ObjectId, ref: 'productModel', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'userModel', required: true },
    created_date: {
        type: Date, 
        default: Date.now
    },
    comment: {
        type: String, 
        required: [true, "Comment kiritilishi shart"]
    }
})
const Comment = model("Comment", commentSchema)

module.exports = Comment