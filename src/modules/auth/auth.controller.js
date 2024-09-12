const bcrypt = require("bcrypt");
const User = require("../user/users.schema.js");
const sendMail  = require("../../utils/send-email.utils.js");
const crypto = require("crypto");
const generateOTP = require("../../utils/generate-otp.utils.js");
const Otp = require("./otp.model.js");

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
        username: req.body.username,
      });

      if (!foundedUser) {
        res.status(404).send({message: "user not found"})
      }

      if (!result) {
        return res.status(409).send({
          message: "Invalid password or username",
        });
      }

      const accessToken = signToken({
        id: foundedUser.id,
        role: foundedUser.role,
      });

      res.cookie("token", accessToken, { maxAge: 1000 * 60 * 6, signed: true });

      switch (foundedUser.role) {
        case "user":
          res.redirect("/user");
          break;
        case "admin":
          res.redirect("/admin");
          break;
        case "super-admin":
          res.redirect("/super-admin");
          break;
        default:
          res.render("404", { message: "User page not found" });
      }
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
        subject: "Verification code for LMS",
        html: `
        <h2>Your verification code:</h2>
        <input type="text" disabled value='${otpCode}'/>
        `,
      });

      res.send({
        verifyText,
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
        res.send({message: "Your OTP is already expired or used"})
      }

      await this.#_otpModel.findByIdAndDelete(foundedOtp.id);

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

  // REGISTER
  signup = async (req, res) => {
    res.send("ok");
  };
}

module.exports = new AuthController();
