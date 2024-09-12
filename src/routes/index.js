const {Router} = require("express");
const userRouter = require("../modules/user/user.routes");
const categoryRouter = require("../modules/category/category.routes");
const productRouter = require("../modules/product/product.routes");
const commentRouter = require("../modules/comment/comment.routes");
const authRoutes = require("../modules/auth/auth.routes")
const routes = Router();

routes.use("/users", userRouter);
routes.use("/categories", categoryRouter)
routes.use("/products", productRouter)
routes.use("/comments", commentRouter)
routes.use("/", authRoutes)

module.exports = routes;