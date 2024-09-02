const mongoose = require("mongoose")
const mongoConfig = require("../config/mongo.config.js")

async function mongoDB(){
    await mongoose.connect(mongoConfig.url)
}

module.exports = mongoDB