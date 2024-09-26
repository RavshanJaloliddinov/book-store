const express = require('express')
const appConfig = require('./config/app.config')
const mongoDB = require("./mongo/mongo")
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser');


app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))


// MIDDLEWARE
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cookieParser("your_secret_key_here"));
// Connecting to mongoDB
mongoDB()
  .then(() => console.log("mongoDB connected"))
  .catch((err) => (console.log(err)))


// API Routes
app.use("/api/v1", routes)

app.get('/front', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Welcome to Node.js with HBS!' });
});

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