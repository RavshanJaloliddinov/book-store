const {Schema, model} = require("mongoose")

const categorySchema = new Schema({
    name: String,
    image: String,
    category_id: Number
})

const Category = model("category", categorySchema)

module.exports = Category