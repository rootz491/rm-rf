const BlogModel = require("../Models/blog.model");


module.exports = {
    getBlogs: async () => {
        try {
            const blogs = await BlogModel.find();
            return blogs;            
        } catch (error) {
            console.log(error)
            return false;
        }
    },
    getOneBlog: async () => {
        try {
            const blog = await BlogModel.findOne();
            return blog;
        } catch (error) {
            console.log(error)
            return false;
        }
    },
    getBlogById: async id => {
        try {
            const blog = await BlogModel.findById(id);
            return blog;
        } catch (error) {
            console.log(error)
            return false;
        }
    },
    pushBlog: async (title, description, content) => {
        try {
            const data = await BlogModel.insertMany({title, description, content});
            return data;
        } catch (error) {
            console.log(error)
            return false;
        }
    },
    deleteBlog: async id => {
        try {
            const data = await BlogModel.findByIdAndDelete(id);
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    editBlog: async (id, title, description, content) => {
        try {
            const blog = await BlogModel.findByIdAndUpdate(id, { title, description, content });
            return blog;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}