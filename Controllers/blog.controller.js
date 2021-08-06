const { getBlogs, getBlogById, pushBlog, getOneBlog, deleteBlog, editBlog } = require("../Services/blog.service");


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
    apiDeleteBlog: async (req, res) => {
        const id = req.params.id;
        try {
            if (id.length != 24) throw "incorrect id";
            const blog = await deleteBlog(id);
            if (blog) res.json({success: true, blog});
            else throw "blog not found";
        } catch (error) {
            console.log(error);
            res.json({success: false, error});
        }
    },
    apiEditBlog: async (req, res) => {
        const id = req.params.id;
        const { title, description, content } = req.body;
        try {
            /*  @todo input validation */
            const blog = await editBlog(id, title, description, content);
            if (blog) res.json({success: true, blog});
            else throw "internal error";
        } catch (error) {
            console.log(error);
            res.json({success: false, error});
        }
    }
}