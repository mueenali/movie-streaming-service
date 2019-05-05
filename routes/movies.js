const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isVerified = require('../middlewares/isVerified');
/* GET home page. */
router.use(isLoggedIn);
router.use(isVerified);
router.get('/',moviesController.allMovies);
router.get('/category/:slug',moviesController.moviesByCategory);
router.get('/newReleases',moviesController.thisYearReleases);
router.get('/:slug',moviesController.showMovie);
router.post('/movie/review/:id',moviesController.addReview);

module.exports = router;
