const{ Schema, model } = require("mongoose")

const userSchema = new Schema({
    full_name: String,
    phone: String,
    password: String,
    email: String,
    created_date: Date,
    image: String
})
const User = model("userModel", userSchema)

module.exports = User