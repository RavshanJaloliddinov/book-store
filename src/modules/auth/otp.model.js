const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    verifyText: {
      type: String,
      unique: [true, "Verfication text must be unique"],
    },
    expire_at: {
      type: Date,
      default: Date.now(),
      expires: 120,
    },
  },
  {
    collection: "otp",
    timestamps: true,
  }
);

const Otp = mongoose.model("OTP", otpSchema);

module.exports = Otp