const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);     // List users
router.get('/:id', userController.getUserById); // Get user by ID

module.exports = router;