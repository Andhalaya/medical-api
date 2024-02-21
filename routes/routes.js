const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/items', itemController.getAllItems);
router.get('/search', itemController.searchItems);
router.get('/filterBy', itemController.filterBy);

module.exports = router;