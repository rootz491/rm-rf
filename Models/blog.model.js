const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Blog", blogSchema);