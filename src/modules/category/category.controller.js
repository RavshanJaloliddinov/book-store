const { isValidObjectId } = require("mongoose")
const Category = require("./category.schema")



class CategoryController {
    #_categoryModels
    constructor() {
        this.#_categoryModels = Category
    }
    getAllCategory = async (req, res, next) => {
        try {
            const allCategories = await this.#_categoryModels.aggregate([
                {
                    $lookup: {
                        from: 'productmodels', // the name of the collection with products
                        localField: '_id',
                        foreignField: 'category_id', // assuming the field in products that references category is 'categoryId'
                        as: 'products'
                    }
                }])
    
            res.send({
                message: "Success",
                page: req.query?.page || 1,
                limit: req.query?.limit || 10,
                results: allCategories.length,
                data: allCategories
            })
        } catch (error) {
          next(error)  
        }
        
    }

    createCategory = async (req, res, next) => {
        try {

            // Ma'lumotlarni o'zgaruvchilarga saqlash
            const { name, category_id } = req.body;


            // Category yaratish
            const newCategory = this.#_categoryModels.create({
                name,
                category_id,
            })

            // Ma'lumotlarni yuborish
            res.status(201).send({
                message: "success",
                data: newCategory
            })
        } catch (error) {
            next(error)
        }

    }

    updateCategory = async (req, res, next) => {
        try {
            // Yangi ma'lumotlarni o'zgaruvchilarga saqlash
            const { name, category_id } = req.body;

            // Category idisin aniqlash
            const { categoryId } = req.params

            //Category id to'gri ekanligin tekshirish
            this.#_chekObjectId(categoryId)

            // Categoryni topish
            const foundedCategory = await this.#_categoryModels.findById(categoryId)

            // Categoryni tekshirish
            if (!foundedCategory) {
                return res.status(404).send({ message: 'User topilmadi' })
            }
            // Categoryni databasedan yangilash
            await User.findByIdAndUpdate(
                categoryId,
                {
                    $set: {
                        name,
                        category_id,
                    }
                })

            res.send({
                message: "Success",
                data: foundedCategory
            })
        } catch (error) {
            next(error)
        }
    }

    deleteCategory = async (req, res, next) => {
        try {
            const { categoryId } = req.params
            this.#_chekObjectId(categoryId)

            const deleteCategory = await this.#_categoryModels.findByIdAndDelete(categoryId)

            if (!deleteCategory) {
                return res.status(404).send({ message: "Category topilmadi" });
            }

            res.send({
                message: "Successfully deleted",
                data: deleteCategory
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



module.exports = new CategoryController()