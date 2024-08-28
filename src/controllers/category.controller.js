const Category = require("../models/category.schema")


class CategoryController {
    constructor(){}
    async getAllCategory(req, res){
        const allCagtegory = await Category.find()

        res.send({
            message: "success",
            results: allCagtegory.length,
            data: allCagtegory
        })
    }
}

module.exports = new CategoryController()