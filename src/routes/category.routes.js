const {Router} = require("express")
const CategoryController = require("../controllers/category.controller")

const categoryRouter = Router()

categoryRouter
    .get("/", CategoryController.getAllCategory)
    .post("/", CategoryController.createCategory)
    .put("/", CategoryController.createCategory)
    .delete("/", CategoryController.deleteCategory)


module.exports = categoryRouter