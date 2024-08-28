const express = require('express')
const appConfig = require('./config/app.config')
const mongoDB = require("./mongo/mongo")
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()

// MIDDLEWARE
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.use("/api/v1", routes)



// Connecting to mongoDB
mongoDB()
    .then(() => console.log("mongoDB connected"))
    .catch((err) => (console.log(err)))


app.listen(appConfig.port, appConfig.host, () => {
    console.log(`listening on ${appConfig.port}`)
})