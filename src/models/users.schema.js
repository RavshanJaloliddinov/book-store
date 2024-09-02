const{ Schema, model } = require("mongoose")

const userSchema = new Schema({
    full_name: {
        type: String,
        required: [true, "full name kiritishli shart"],
    },
    phone: {
        type: String,
        required: [true, "phone kiritilishi shart"],
        validate: {
            validator: function(v) {
                return v && v.length >= 5;  // Telefon raqami uzunligi aniq 13 bo'lishi kerak
            },
            message: "phone 13 ta belgidan iborat bo'lishi kerak"
        }
    },
    password: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date, 
        default: Date.now
    },
    role: {
        type: String,
    },
    image: String
})
const User = model("userModel", userSchema)

module.exports = User