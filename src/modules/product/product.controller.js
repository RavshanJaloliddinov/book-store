const Product = require("./product.schema")
const { isValidObjectId } = require("mongoose")
const ApiFeature = require("../../utils/api-featuries.utils")


class productController {

    #_productModel
    constructor() {
        this.#_productModel = Product
    }

    getAllProducts = async (req, res, next) => {
        try {
            let query = { ...req.query };

            const allProducts = await new ApiFeature(
                this.#_productModel.find(),
                query
            )
            .limitFields()
            .paginate()
            .sort("price")
            .filter()
            .getQuery()

            res.send({
                message: "Success",
                page: req.query?.page || 1,
                limit: req.query?.limit || 10,
                results: allProducts.length,
                data: allProducts
            });

        } catch (error) {
            next(error)
        }
    }
    createProduct = async (req, res, next) => {
        try {
            const { category_id, title, price, description, author, publisher, language, genre, quantity } = req.body;
    
            // Fayllarni olish
            const images = req.files ? req.files.map(file => file.filename) : [];
    
            const newProduct = await this.#_productModel.create({
                category_id,
                title,
                price,
                description,
                author,
                publisher,
                language,
                images, 
                genre,
                quantity,
            });
    
            res.status(201).send({
                message: "Success",
                data: newProduct
            });
        } catch (error) {
            next(error);
        }
    };
    deleteProduct = async (req, res, next) => {
        try {
            const { productId } = req.params
            this.#_chekObjectId(productId)
            const deletedProduct = await this.#_productModel.findByIdAndDelete(productId)
            console.log(deletedProduct)
            if (!deletedProduct) {
                return res.status(404).send({ message: "Product not found" })
            }

            res.send({
                message: "Successfully deleted",
                data: deletedProduct
            })

        } catch (error) {
            next(error)
        }
    }
    updateProduct = async (req, res, next) => {
        try {
            const { category_id, title, price, description, author, publisher, language, genre, quantity } = req.body;
            const { productId } = req.params;
    
            // Fayllarni olish
            const images = req.files ? req.files.map(file => file.filename) : [];
    
            // productId mavjudligini tekshirish
            if (!productId) {
                return res.status(400).send({ message: "Mahsulot ID kiritilishi kerak" });
            }
    
            // ObjectId ning to'g'riligini tekshirish
            this.#_chekObjectId(productId);
    
            // Mahsulotni yangilash
            const updatedProduct = await this.#_productModel.findByIdAndUpdate(
                { _id: productId },
                {
                    title,
                    category_id,
                    price,
                    images, // Yangilangan rasmlar ro'yxati
                    description,
                    author,
                    publisher,
                    language,
                    genre,
                    quantity,
                },
                { new: true } // Yangilangan mahsulotni qaytarish
            );
    
            // Agar mahsulot topilmasa
            if (!updatedProduct) {
                return res.status(404).send({ message: "Mahsulot topilmadi" });
            }
    
            res.status(200).send({
                message: "Muvaffaqiyatli yangilandi",
                data: updatedProduct,
            });
        } catch (error) {
            next(error);
        }
    }
    #_chekObjectId = (id) => {
        if (!isValidObjectId(id)) {
            throw new Error(`Id: ${id} is not a valid object`)
        }
        return null;
    }
}

module.exports = new productController