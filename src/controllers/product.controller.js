const Product = require("../models/category.schema")


class productController{

    #_productModel
    constructor(){
        this.#_productModel = Product   
    }

    getAllProducts = async (req, res) => {
        try {
            const getAllProducts = await this.#_productModel.find()

            res.send({
                message: "Success",
                results: getAllProducts.length, 
                data: getAllProducts
            })

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
    createProduct = async (req, res) =>{
        try {
            const {title, price, images, decription, author, publisher, language, genre, quentity} = req.body

            const newProduct = await this.#_productModel.create({
                title,
                price,
                images,
                description, 
                author,
                publisher,
                language,
                genre, 
                quentity,
            })
            res.status(201).send({
                message: "Success",
                data: newProduct
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
    deleteProduct = async (req, res) => {
        try {
            const {productId} = req.body
            this.#_chekObjectId(productId)

            deletedProduct = await this.#_productModel.findByIdAndDelete(productId)

            if(!deletedProduct){
                return res.status(404).send({message: "Product not found"})
            }

            res.send({
                message: "Successfully deleted",
                data: deletedProduct
            })

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
    updateProduct = async(req, res) => {
        const {productId} = req.body

        this.#_chekObjectId(productId)

        updatedProduct = await this.#_productModel.findByIdAndUpdate(productId)
        if(!updatedProduct){
            res.status(404).send({message:"Product not found"})
        }

        res.status(500).send({
            message: "Successfully updated",
            data: updatedProduct
        })
    }
    #_chekObjectId = (id) => {
        if(!isValidObjectId(id)) {
            throw new Error(`Id: ${id} is not a valid object`)
        }
        return null;
    }
}

module.exports = new productController