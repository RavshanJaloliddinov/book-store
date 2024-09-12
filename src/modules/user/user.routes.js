const {Router} = require("express")
const { ValidationMiddleware } = require("../../middleware/validation.middleware")
const userRouter = Router()
const userController = require("./user.controller")
const upload = require("../../utils/multer.utils")
const { updateUserSchema } = require("./dtos/user-update.dto")
const { createUserSchema } = require("./dtos/user-create.dto")

userRouter
    .get("/", userController.getAllUsers)
    .post(
        "/", 
        upload.single("image"), // Bitta rasm yuklanadi
        ValidationMiddleware(createUserSchema), 
        userController.createUser
    )
    .put(
        "/:userId", 
        upload.single("image"), // Bitta rasm yuklanadi
        ValidationMiddleware(updateUserSchema), 
        userController.updateUser
    )
    .delete("/:userId", userController.deleteUser)

module.exports = userRouter