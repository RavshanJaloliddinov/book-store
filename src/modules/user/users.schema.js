const{ Schema, model } = require("mongoose")

const userSchema = new Schema({
    full_name: {
        type: String,
        required: [true, "full name kiritishli shart"],
    },
    phone: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String, 
        required: [true, "role kiritilishi shart"],
        default: "user"
    },
    image: String
}, {
    timestamps: true
}
)
const User = model("userModel", userSchema)

module.exports = User