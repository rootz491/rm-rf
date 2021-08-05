const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors")
require("dotenv").config();

const { getBlogs, getBlogById } = require("./Services/blog.service");
const BlogRoutes = require("./Routes/blog.routes");

const app = express();
const allowedOrigin = 'localhost:3000';

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to database successfully"));

app.use(express.json());
app.use(logger("dev"));
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

app.use("/api", BlogRoutes);

app.listen(process.env.PORT, _ => {
    console.log("server is running on port " + process.env.PORT)
})