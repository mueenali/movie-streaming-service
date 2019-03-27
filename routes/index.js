const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
/* GET home page. */
router.get('/',appController.index);

module.exports = router;
