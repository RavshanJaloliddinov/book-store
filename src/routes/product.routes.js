const {Router} = require("express")
const productController = require("../controllers/product.controller")

const productRouter = Router()

productRouter
    .get("/", productController.getAllProducts)
    .post("/", productController.createProduct)
    .put("/", productController.updateProduct)
    .delete("/", productController.deleteProduct)

module.exports = productRouter