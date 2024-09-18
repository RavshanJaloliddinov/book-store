const { Router } = require("express");
const authController = require("./auth.controller.js");
const { loginSchema } = require("./dtos/login.dto.js");
const {ValidationMiddleware} = require("../../middleware/validation.middleware.js");
const verifyOTPDto  = require("./dtos/verify-otp.dto.js");
const generateOTPDto = require("./dtos/genereate-otp.dto.js");

const authRoutes = Router();

authRoutes
  .post("/login", authController.signin)
  .post(
    "/generate-otp",
    ValidationMiddleware(generateOTPDto),
    authController.generateOtp
  )
  .post(
    "/verify-otp",
    ValidationMiddleware(verifyOTPDto),
    authController.verifyOtp
  )


module.exports = authRoutes;
