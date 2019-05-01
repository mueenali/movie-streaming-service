const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const commentReviewController = require('../controllers/commentReviewController');
/* GET home page. */

router.get('/',moviesController.allMovies);
router.get('/category/:slug',moviesController.moviesByCategory);
router.get('/newReleases',moviesController.thisYearReleases);
router.get('/:slug',moviesController.showMovie);
router.post('/comments/create',commentReviewController.createComment);
module.exports = router;
