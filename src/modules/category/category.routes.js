const { Router } = require("express");
const CategoryController = require("./category.controller");
const { ValidationMiddleware } = require("../../middleware/validation.middleware");
const { createCategorySchema } = require("./dtos/category-create.dto");

const categoryRouter = Router();

categoryRouter
    .get("/", CategoryController.getAllCategory)
    .post("/", ValidationMiddleware(createCategorySchema), CategoryController.createCategory)
    .put("/:id", CategoryController.updateCategory) // PUT dinamik ID bilan yangilash
    .delete("/:id", CategoryController.deleteCategory); // DELETE dinamik ID bilan o'chirish

module.exports = categoryRouter;
