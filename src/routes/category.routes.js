const {Router} = require("express")
const CategoryController = require("../controllers/category.controller")

const categroryRouter = Router()

categroryRouter
    .get("/", CategoryController.getAllCategory)


module.exports = categroryRouter