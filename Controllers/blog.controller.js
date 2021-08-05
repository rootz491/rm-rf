const { getBlogs, getBlogById, pushBlog, getOneBlog } = require("../Services/blog.service");


module.exports = {
    apiGetBlogs: async (_, res) => {
        try {
            const blogs = await getBlogs();
            if (blogs) res.json({success: true, blogs})
            else throw "internal error";
        } catch (error) {
            console.log(error);
            res.json({success: false, error});
        }
    },
    apiGetOneBlog: async (_, res) => {
        try {
            const blog = await getOneBlog();
            if (blog) res.json({success: true, blog})
            else throw "internal error";
        } catch (error) {
            console.log(error);
            res.json({success: false, error});
        }
    },
    apiGetBlogById: async (req, res) => {
        const id = req.params.id;
        try {
            if (id.length != 24) throw "invalid id";
            const blog = await getBlogById(id);
            if (blog) res.json({success: true, blog});
            else throw "not found";
        } catch (error) {
            console.log(error);
            res.json({success: false, error});
        }
    },
    apiPushBlog: async (req, res) => {
        const { title, description, content } = req.body;
        try {
            /*  @todo input validation */
            const blog = await pushBlog(title, description, content);
            if (blog) res.json({success: true, blog});
            else throw "internal error";
        } catch (error) {
            console.log(error);
            res.json({success: false, error});
        }
    },

}