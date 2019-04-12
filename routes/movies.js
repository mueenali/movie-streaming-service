const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
/* GET home page. */
router.get('/',moviesController.allMovies);
router.get('/category/:slug',moviesController.moviesByCategory);

module.exports = router;
