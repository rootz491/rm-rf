const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors")
require("dotenv").config();

const { getBlogs, getBlogById } = require("./Services/blog.service");

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


app.get('/getData', async (_, res) => {
    const blogs = await getBlogs()
    res.json(blogs);
})

app.get('/api/blog/:id', async (req, res) => {
    const blog = await getBlogById(req.params.id);
    res.json(blog);
})


app.listen(process.env.PORT, _ => {
    console.log("server is running on port " + process.env.PORT)
})