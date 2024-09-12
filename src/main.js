const express = require('express')
const appConfig = require('./config/app.config')
const mongoDB = require("./mongo/mongo")
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const ErrorHandlerMiddleware = require('./middleware/error-handler.middleware')
const app = express()

// MIDDLEWARE
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

  // Connecting to mongoDB
mongoDB()
    .then(() => console.log("mongoDB connected"))
    .catch((err) => (console.log(err)))


// API Routes
app.use("/api/v1", routes)

// Sends a 404 response for all undefined routes
app.all("*", (req, res) => {
    res.status(404).send({
    message: `${req.url} endpoint mavjud emas`,
    });
  });

// Error handler middleware 
// app.use(ErrorHandlerMiddleware);

app.listen(appConfig.port, appConfig.host, () => {
    console.log(`listening on ${appConfig.port}`)
})