const { Schema, model } = require("mongoose")

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category_id: Number
})

const Category = model("category", categorySchema)

module.exports = Category