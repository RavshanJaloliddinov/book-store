const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    title: {type: String, required: true},
    category_id: {type: Schema.Types.ObjectId, ref: 'category', required: true },
    price: {type: Number, required: true},
    images: {type: [String], required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: true},
    language: {type: String, required: true},
    genre: { 
        type: String, 
        enum: ['Fantasy', 'Science Fiction', 'Adventure', 'Mystery', 'Thriller', 'Romance', 'Drama', 'Horror', 'Historical Fiction', 'Biography', 'Non-Fiction', 'Self-Help', 'Philosophy'],
        required: true 
    },
    quentitiy: {type: Number, required: true}
})

const Product = model("productModel", productSchema)

module.exports = Product