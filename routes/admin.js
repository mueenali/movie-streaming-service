const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const csrfProtection = csurf();
const adminController = require('../controllers/adminController');
const adminUsersController = require('../controllers/adminUsersController');
const adminCategoriesController = require('../controllers/adminCategoriesController');
const adminSubscriptionsController = require('../controllers/adminSubscriptionsController');

const adminMoviesController = require('../controllers/adminMoviesController');
// router.use(csrfProtection);
router.get('/',adminController.index);

router.get('/users', adminUsersController.index);
router.get('/users/create',adminUsersController.create);
router.post('/users/create',adminUsersController.store);
router.get('/users/edit/:id',adminUsersController.edit);
router.put('/users/update/:id',adminUsersController.update);
router.delete('/users/delete/:id',adminUsersController.remove);

router.get('/categories',adminCategoriesController.index);
router.get('/categories/create',adminCategoriesController.create);
router.post('/categories/create',adminCategoriesController.store);
router.get('/categories/edit/:id',adminCategoriesController.edit);
router.put('/categories/update/:id',adminCategoriesController.update);
router.delete('/categories/delete/:id',adminCategoriesController.remove);

router.get('/subscriptions',adminSubscriptionsController.index);
router.get('/subscriptions/create',adminSubscriptionsController.create);
router.post('/subscriptions/create',adminSubscriptionsController.store);
router.get('/subscriptions/edit/:id',adminSubscriptionsController.edit);
router.put('/subscriptions/update/:id',adminSubscriptionsController.update);
router.delete('/subscriptions/delete/:id',adminSubscriptionsController.remove);

router.get('/movies',adminMoviesController.index);
router.get('/movies/create',adminMoviesController.create);
router.post('/movies/create',adminMoviesController.store);
router.get('/movies/showVideos/:id',adminMoviesController.show);
router.get('/movies/edit/:id',adminMoviesController.edit);
router.delete('/movies/delete/:id',adminMoviesController.remove);
router.put('/movies/update/:id',adminMoviesController.update);
router.post('/movies/updatePath/:id',adminMoviesController.updatePaths);

module.exports = router;
