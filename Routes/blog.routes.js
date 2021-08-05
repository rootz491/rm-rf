const router = require("express").Router();
const { apiGetBlogs, apiGetBlogById, apiPushBlog, apiGetOneBlog } = require("../Controllers/blog.controller");

router.get("/blogs", apiGetBlogs);
router.get("/blogs/latest", apiGetOneBlog);
router.get("/blog/:id", apiGetBlogById);
router.post('/post', apiPushBlog);


module.exports = router;