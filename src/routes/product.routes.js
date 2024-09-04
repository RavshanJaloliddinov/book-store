const {Router} = require("express")
const productController = require("../controllers/product.controller")

const productRouter = Router()

productRouter
    .get("/", productController.getAllProducts)
    .post("/", productController.createProduct)
    .put("/:productId", productController.updateProduct)
    .delete("/:productId", productController.deleteProduct)

module.exports = productRouter