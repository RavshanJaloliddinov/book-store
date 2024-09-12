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
            const { category_id, title, price, images, description, author, publisher, language, genre, quentitiy } = req.body

            const newProduct = await this.#_productModel.create({
                category_id,
                title,
                price,
                images,
                description,
                author,
                publisher,
                language,
                genre,
                quentitiy,
            })
            res.status(201).send({
                message: "Success",
                data: newProduct
            })
        } catch (error) {
            next(error)
        }
    }
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
            const { category_id, title, price, images, description, author, publisher, language, genre, quentitiy } = req.body
            const { productId } = req.params

            this.#_chekObjectId(productId)

            const updatedProduct = await this.#_productModel.findByIdAndUpdate({ _id: productId }, {
                title,
                category_id,
                price,
                images,
                description,
                author,
                publisher,
                language,
                genre,
                quentitiy,
            })
            if (!updatedProduct) {
                res.status(404).send({ message: "Product not found" })
            }

            res.status(500).send({
                message: "Successfully updated",
                data: updatedProduct
            })
        } catch (error) {
            next(error)
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