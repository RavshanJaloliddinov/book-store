const { Router } = require("express")
const productController = require("./product.controller")
const { ValidationMiddleware } = require("../../middleware/validation.middleware")
const { createProductSchema } = require("./dtos/product-create.dto")
const { updateProductSchema } = require("./dtos/product-update.dro")

const productRouter = Router()

productRouter
    .get("/", productController.getAllProducts)
    .post("/", ValidationMiddleware(createProductSchema), productController.createProduct)
    .put("/:productId", ValidationMiddleware(updateProductSchema), productController.updateProduct)
    .delete("/:productId", productController.deleteProduct)

module.exports = productRouter
