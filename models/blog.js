const mongoose = require('mongoose');
const Schema = mongoose.Schema; // stores schema constructor

const blogSchema = new Schema({ // creates schema
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true}); // automatically generates timestamp properties

const Blog = mongoose.model('Blog', blogSchema); // looks for pluralized collection for the name, 'Blogs'
module.exports = Blog; // allows blog model to be imported by other modules
