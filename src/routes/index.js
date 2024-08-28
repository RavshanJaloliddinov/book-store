const {Router} = require("express");
const userRouter = require("./user.routes");
const categroryRouter = require("./category.routes");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/categories", categroryRouter)

module.exports = routes;