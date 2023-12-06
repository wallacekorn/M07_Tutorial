const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


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

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs'); // redirects to url
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes); // imports blogRoutes when request starts with /blogs

// 404 page (at the bottom so it only triggers if none else are called)
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});