const { Schema, model } = require("mongoose")

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'category' 
    }
})

const Category = model("category", categorySchema)

module.exports = Category