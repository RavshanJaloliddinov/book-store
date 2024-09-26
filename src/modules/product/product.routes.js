const { Router } = require("express");
const productController = require("./product.controller");
const { ValidationMiddleware } = require("../../middleware/validation.middleware");
const { createProductSchema } = require("./dtos/product-create.dto");
const { updateProductSchema } = require("./dtos/product-update.dto"); // ".dro" o'rniga ".dto"
const upload = require("../../utils/multer.utils");
const CheckRoleGuards = require('../../guards/check-role.guard')
const CheckAuthGuards = require('../../guards/check-auth.guard')

const productRouter = Router(); 

productRouter
    .get("/", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        productController.getAllProducts
    )
    .post(
        "/", 
        upload.array("images", 5), // Maksimal 5 ta rasm yuklanishi mumkin
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        // ValidationMiddleware(createProductSchema), 
        productController.createProduct
    )
    .put(
        "/:productId", 
        upload.array("images", 5), // Maksimal 5 ta rasm yuklanishi mumkin
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        ValidationMiddleware(updateProductSchema), 
        productController.updateProduct
    )
    .delete(
        "/:productId", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        productController.deleteProduct
    );

module.exports = productRouter;
