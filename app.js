const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// declare express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://player2:heta2@tutorialm06.legqyjk.mongodb.net/whatsinaname?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000)) // once the connection to database is complete begins to listen for connections
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// //mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => { 
//     const blog = new Blog({ // using model to create new instance of a blog document
//         title: 'new blog 2', // pass in data
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     }); 
//     blog.save() // saves the blog document to the database
//         .then((result) => { // once the promise is resolved
//             res.send(result) // sends the blog document back
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result); // Sends array of all documents in the collection
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get('/single-blog', (req,res) => {
//     Blog.findById('65683ded8de565a2755ce041') // _id property
//         .then((result) => {
//             res.send(result) // sends single document
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs'); // redirects to url
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.get('/blogs/create', (req,res) => {
    res.render('create', { title: 'Create a new Blog' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result }); // render template view
        })
        .catch((err) => {
            console.log(err);
        })
   

})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id; // access the route parameter
    
    Blog.findByIdAndDelete(id) // deletes document from database by id
      .then(result => {
        res.json({ redirect: '/blogs' }); //must be json because ajax
      })
      .catch(err => {
        console.log(err);
      });
  });

// 404 page (at the bottom so it only triggers if none else are called)
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});