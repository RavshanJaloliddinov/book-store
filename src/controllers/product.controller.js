const Product = require("../models/product.schema")
const {isValidObjectId} = require("mongoose")

class productController{

    #_productModel
    constructor(){
        this.#_productModel = Product   
    }

    getAllProducts = async (req, res) => {
        try {

            const query = { 
                ...query,  
                price: {
                    $gt: query.price.split("~")[0],
                    $lt: query.price.split("~")[1],
                },
                rating: {
                    $gte: query.rating.split("~")[0],
                    $lte: query.rating.split("~")[1],
                }
                
            };


            const allProducts = await this.#_productModel.find(query)

            res.send({
                message: "Success",
                results: allProducts.length, 
                data: allProducts
            })

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
    createProduct = async (req, res) =>{
        try {
            const {title, price, images, description, author, publisher, language, genre, quentitiy} = req.body

            const newProduct = await this.#_productModel.create({
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
            res.status(500).send({
                message: error.message
            })
        }
    }
    deleteProduct = async (req, res) => {
        try {
            const {productId} = req.body
            this.#_chekObjectId(productId)
            const deletedProduct = await this.#_productModel.findByIdAndDelete(productId)
            console.log(deletedProduct)
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