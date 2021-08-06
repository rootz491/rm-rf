const router = require("express").Router();
const { apiGetBlogs, apiGetBlogById, apiPushBlog, apiGetOneBlog, apiDeleteBlog, apiEditBlog } = require("../Controllers/blog.controller");

router.get("/blogs", apiGetBlogs);
router.get("/blogs/latest", apiGetOneBlog);
router.post('/post', apiPushBlog);
router.get("/blog/:id", apiGetBlogById);
router.delete('/blog/:id', apiDeleteBlog);
router.patch('/blog/:id', apiEditBlog);

module.exports = router;