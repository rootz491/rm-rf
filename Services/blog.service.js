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
    pushBlog: async (title, content) => {
        try {
            const data = await BlogModel.insertMany({title, content});
            console.log(data);
            // return data;
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
    } 
}