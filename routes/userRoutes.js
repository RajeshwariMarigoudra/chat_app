const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers  } = require('../controllers/userController');

// Routes for user registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Route to get all users
router.get('/', getAllUsers);

module.exports = router;

