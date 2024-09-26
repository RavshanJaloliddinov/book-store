const{ Schema, model } = require("mongoose")

const userSchema = new Schema({
    full_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String, 
        default: "user"
    },
    image: String
}, {
    timestamps: true
}
)
const User = model("userModel", userSchema)

module.exports = User