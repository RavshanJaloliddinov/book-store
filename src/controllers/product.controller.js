const Product = require("../models/product.schema")
const { isValidObjectId } = require("mongoose")

class productController {

    #_productModel
    constructor() {
        this.#_productModel = Product
    }

    getAllProducts = async (req, res) => {
        try {

            let query = { ...req.query };
            const excludeQueries = ["limit", "page", "sort", "fields"]
            excludeQueries.map((efl) => delete query[efl])
            
            
            query = JSON.parse(
                JSON.stringify(query).replace(
                    /\b(lt|gt|lte|gte)\b/g,
                    (match) => `$${match}`
                )
            );
            let databaseQuery = this.#_productModel.find(query);


            //  Sorting 
            if(req.query.sort){
                const sortFields = req.query.sort.split(",").join("")
                databaseQuery = databaseQuery.sort(sortFields)
            }else {
                databaseQuery = databaseQuery.sort("price")
            } 

            // Fields limiting 
            if(req.query.fields){
                const selectedFields = req.query.fields.split(",").join(" ")

                databaseQuery = databaseQuery.select(selectedFields)
            }

            // Pagination
            const limit = !isNaN(req.query.limit) ? Number(req.query.limit) : 2;
            const offset = !isNaN(req.query.page) ? (Number(req.query.page) - 1) * limit : 0;
            
            // Fetch paginated products
            const allProducts = await databaseQuery.limit(limit).skip(offset);
            
            res.send({
                message: "Success",
                page: req.query?.page || 1,
                results: allProducts.length,
                data: allProducts
            });

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
    createProduct = async (req, res) => {
        try {
            const { title, price, images, description, author, publisher, language, genre, quentitiy } = req.body

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
            res.status(500).send({
                message: error.message
            })
        }
    }
    updateProduct = async (req, res) => {
        const { title, price, images, description, author, publisher, language, genre, quentitiy } = req.body
        const { productId } = req.params

        this.#_chekObjectId(productId)
        
        const updatedProduct = await this.#_productModel.findByIdAndUpdate({_id:productId}, {
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
        if (!updatedProduct) {
            res.status(404).send({ message: "Product not found" })
        }

        res.status(500).send({
            message: "Successfully updated",
            data: updatedProduct
        })
    }
    #_chekObjectId = (id) => {
        if (!isValidObjectId(id)) {
            throw new Error(`Id: ${id} is not a valid object`)
        }
        return null;
    }
}

module.exports = new productController