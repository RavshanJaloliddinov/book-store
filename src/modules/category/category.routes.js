const { Router } = require("express");
const CategoryController = require("./category.controller");
const { ValidationMiddleware } = require("../../middleware/validation.middleware");
const { createCategorySchema } = require("./dtos/category-create.dto");
const CheckRoleGuards = require('../../guards/check-role.guard')
const CheckAuthGuards = require('../../guards/check-auth.guard')

const categoryRouter = Router();

categoryRouter
    .get(
        "/", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        CategoryController.getAllCategory
    )
    .post(
        "/", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        ValidationMiddleware(createCategorySchema), 
        CategoryController.createCategory
    )
    .put(
        "/:id", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        CategoryController.updateCategory
    ) // PUT dinamik ID bilan yangilash
    .delete(
        "/:id", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        CategoryController.deleteCategory
    ); // DELETE dinamik ID bilan o'chirish

module.exports = categoryRouter;
 