const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router(); // instance of a router object


//blog routes
router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index); // blogController.blog_index pulls the function from the controller
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);  
router.delete('/:id', blogController.blog_delete);

module.exports = router; // allows for export