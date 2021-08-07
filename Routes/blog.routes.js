const router = require("express").Router();
const { apiGetBlogs, apiGetBlogById, apiPushBlog, apiGetOneBlog, apiDeleteBlog, apiEditBlog } = require("../Controllers/blog.controller");
const { isAuthenticated, isAuthorized } = require("../Services/verification.service");

router.get("/blogs", apiGetBlogs);
router.get("/blogs/latest", apiGetOneBlog);
router.post('/post', isAuthenticated, apiPushBlog);
router.get("/blog/:id", apiGetBlogById);
router.delete('/blog/:id', isAuthenticated, isAuthorized, apiDeleteBlog);
router.patch('/blog/:id', isAuthenticated, apiEditBlog);

module.exports = router;