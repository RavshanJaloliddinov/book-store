const {Router} = require("express")
const userController = require("./user.controller")
const { ValidationMiddleware } = require("../../middleware/validation.middleware")
const { createCategorySchema } = require("../category/dtos/category-create.dto")
const { updateCategorySchema } = require("../category/dtos/category-update.dto")

const userRouter = Router()

userRouter
    .get("/", userController.getAllUsers)
    .post("/", ValidationMiddleware(createCategorySchema), userController.createUser)
    .put("/:userId", ValidationMiddleware(updateCategorySchema),userController.updateUser)
    .delete("/:userId", userController.deleteUser)

module.exports = userRouter