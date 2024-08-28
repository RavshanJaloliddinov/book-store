const {Router} = require("express")
const userController = require("../controllers/user.controller")

const userRouter = Router()

userRouter
    .get("/", userController.getAllUsers)
    .post("/", userController.createUser)
    .put("/:userId", userController.updateUser)
    .delete("/:userId", userController.deleteUser)

module.exports = userRouter