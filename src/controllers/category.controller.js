const Category = require("../models/category.schema")


class CategoryController {
    #_categoryModels
    constructor(){
        this.#_categoryModels = Category
    }
    getAllCategory = async(req, res) => {
        const allCagtegory = await Category.find()

        res.send({
            message: "success",
            results: allCagtegory.length,
            data: allCagtegory
        })
    }

    createCategory = async (req, res) => {
        try {
            // Ma'lumotlarni o'zgaruvchilarga saqlash
            const {name, image, } = req.body;

            // Category yaratish
            const newCategory =  this.#_categoryModels.create({
                name,
                image,
                category_id
            })

            // Ma'lumotlarni yuborish
            res.status(201).send({
                message: "success",
                data: newCategory
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }

    }


    updateCategory = async (req, res) => {
        try {
            // Yangi ma'lumotlarni o'zgaruvchilarga saqlash
            const {name, image, category_id} = req.body;
    
            // Category idisin aniqlash
            const { categoryId } = req.params
    
            //Category id to'gri ekanligin tekshirish
            this.#_chekObjectId(categoryId)
    
            // Categoryni topish
            const foundedCategory = await this.#_categoryModels.findById(categoryId)
    
            // Categoryni tekshirish
            if(!foundedCategory){
               return res.status(404).send({message: 'User topilmadi'})
            }
            // Categoryni databasedan yangilash
            await User.findByIdAndUpdate(
                categoryId,
            {
                $set: {
                    name,
                    image,
                    category_id,
                }
            })
    
            res.send({
                message: "Success",
                data: foundedCategory
            })        
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
    deleteCategory = async(req, res) => {
        try {
            const {categoryId} = req.params
            this.#_chekObjectId(categoryId)

            const deleteCategory = await this.#_categoryModels.findOne(categoryId)

            if (!deleteCategory) {
                return res.status(404).send({ message: "Category topilmadi"});
            }

            res.send({
                message: "Successfully deleted",
                data: deleteCategory
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    #_chekObjectId = (id) => {
        if(!isValidObjectId(id)) {
            throw new Error(`Id: ${id} is not a valid object`)
        }

        return null;
    }
}



module.exports = new CategoryController()