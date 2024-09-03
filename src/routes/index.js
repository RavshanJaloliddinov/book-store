const {Router} = require("express");
const userRouter = require("./user.routes");
const categoryRouter = require("./category.routes");
const productRouter = require("./product.routes");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/categories", categoryRouter)
routes.use("/products", productRouter)

module.exports = routes;