const bcrypt = require("bcrypt");
const User = require("../user/users.schema.js");
const sendMail = require("../../utils/send-email.utils.js");
const crypto = require("crypto");
const generateOTP = require("../../utils/generate-otp.utils.js");
const Otp = require("./otp.model.js");
const {signToken, verifyToken} = require("../../helper/jwt.helper.js");

class AuthController {
  #_userModel
  #_otpModel

  constructor() {
    this.#_userModel = User;
    this.#_otpModel = Otp;
  }

  // LOGIN
  signin = async (req, res, next) => {
    try {

      const foundedUser = await this.#_userModel.findOne({
        email: req.body.email,
      });


      if (!foundedUser) {
        res.status(404).send({message: "User not found"})
      };

      const accessToken = signToken({
        email: foundedUser.email,
        role: foundedUser.role,
      });
      
      res.cookie("token", accessToken, { maxAge: 1000 * 60 * 6, signed: true });
      res.send({foundedUser, accessToken})
      // switch (foundedUser.role) {
      //   case "user":
      //     res.redirect("/user");
      //     break;
      //   case "admin":
      //     res.redirect("/admin");
      //     break;
      //   case "super-admin":
      //     res.redirect("/super-admin");
      //     break;
      //   default:
      //     res.render("404", { message: "User page not found" });
      // }
    } catch (error) {
      next(error);
    }
  };

  // Generate OTP
  generateOtp = async (req, res, next) => {
    try {
      const { email } = req.body;
      const otpCode = generateOTP();

      const verifyText = crypto.randomBytes(64).toString("hex");

      await this.#_otpModel.create({
        email,
        verifyText,
        code: otpCode,
      });

      await sendMail({
        to: email,
        subject: "Verification code for Book Store",
        html: `
        <h2>Your verification code:</h2>
        <input type="text" disabled value='${otpCode}'/>
        `,
      });

      res.send({
        verifyText,
        code: otpCode,
      });
    } catch (error) {
      next(error);
    }
  };

  // Verify OTP
  verifyOtp = async (req, res, next) => {
    try {
      const { code, verifyText } = req.body;

      const foundedOtp = await this.#_otpModel.findOne({ code, verifyText });

      if (!foundedOtp) {
        res.send({ message: "Your OTP is already expired or used" })
      }

      await this.#_otpModel.findByIdAndDelete(foundedOtp._id);

      res.send({
        user: {
          email: foundedOtp.email,
        },
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
