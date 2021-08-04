const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("connected to database successfully"));


app.use(express.json())
app.use(logger("dev"));


app.get('/', (_, res) => {
    res.send("hello");
})


app.listen(process.env.PORT, _ => {
    console.log("server is running on port " + process.env.PORT)
})