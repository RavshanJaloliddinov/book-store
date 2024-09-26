const { Router } = require("express")
const { ValidationMiddleware } = require("../../middleware/validation.middleware")
const CheckRoleGuards = require('../../guards/check-role.guard')
const CheckAuthGuards = require('../../guards/check-auth.guard')

const { updateUserSchema } = require("./dtos/user-update.dto")
const { createUserSchema } = require("./dtos/user-create.dto")
const userController = require("./user.controller")
const upload = require("../../utils/multer.utils")

const userRouter = Router()

userRouter
    .get("/",
        CheckAuthGuards(true),
        // CheckRoleGuards("super-admin", "admin"),
        userController.getAllUsers
    )
    .post(
        "/",
        upload.single("image"), // Bitta rasm yuklanadi
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin"),
        ValidationMiddleware(createUserSchema),
        userController.createUserByUser
    )
    .post(
        "/by-admin",
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin"),
        ValidationMiddleware(createUserSchema),
        userController.createUserByAdmin
    )
    .put(
        "/:userId",
        upload.single("image"), // Bitta rasm yuklanadi
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin"),
        ValidationMiddleware(updateUserSchema),
        userController.updateUser
    )
    .delete("/:userId",
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin"),
        userController.deleteUser)

module.exports = userRouter