const router = require("express").Router();
const { apiGetBlogs, apiGetBlogById, apiPushBlog, apiGetOneBlog, apiDeleteBlog, apiEditBlog, apiGetBlogByUser } = require("../Controllers/blog.controller");
const { isAuthenticated } = require("../Services/verification.service");

router.get("/blogs", apiGetBlogs);
router.get("/blogs/latest", apiGetOneBlog);
router.post("/blogs", isAuthenticated, apiGetBlogByUser);
router.post('/post', isAuthenticated, apiPushBlog);
router.get("/blog/:id", isAuthenticated, apiGetBlogById);
router.delete('/blog/:id', isAuthenticated, apiDeleteBlog);
router.patch('/blog/:id', isAuthenticated, apiEditBlog);

module.exports = router;