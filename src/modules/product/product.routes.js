const { Router } = require("express");
const productController = require("./product.controller");
const { ValidationMiddleware } = require("../../middleware/validation.middleware");
const { createProductSchema } = require("./dtos/product-create.dto");
const { updateProductSchema } = require("./dtos/product-update.dto"); // ".dro" o'rniga ".dto"
const upload = require("../../utils/multer.utils");

const productRouter = Router();

productRouter
    .get("/", productController.getAllProducts)
    
    // Bir nechta rasm yuklash bilan mahsulot yaratish
    .post(
        "/", 
        upload.array("images", 5), // Maksimal 5 ta rasm yuklanishi mumkin
        ValidationMiddleware(createProductSchema), 
        productController.createProduct
    )
    
    // Bir nechta rasm yuklash bilan mahsulot yangilash
    .put(
        "/:productId", 
        upload.array("images", 5), // Maksimal 5 ta rasm yuklanishi mumkin
        ValidationMiddleware(updateProductSchema), 
        productController.updateProduct
    )
    
    .delete("/:productId", productController.deleteProduct);

module.exports = productRouter;
