const Blog = require('../models/blog');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result }); // render template view
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_details = (req, res) => {    
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
        console.log(err);
        });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
    
}

const blog_delete = (req, res) => {
    const id = req.params.id; // access the route parameter
    
    Blog.findByIdAndDelete(id) // deletes document from database by id
        .then(result => {
        res.json({ redirect: '/blogs' }); //must be json because ajax
        })
        .catch(err => {
        console.log(err);
        });        
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}