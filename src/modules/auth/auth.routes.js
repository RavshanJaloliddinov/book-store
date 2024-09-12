const {Router} = require("express")
const AuthController = require("./auth.controller")


const authRoutes = Router();

authRoutes
  .post("/login", AuthController.signin)

module.exports = authRoutes