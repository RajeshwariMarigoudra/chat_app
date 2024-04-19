const express = require('express');
const router = express.Router();
const { sendMessage, getAllMessages } = require('../controllers/messageController');

// Route to send a message
router.post('/', sendMessage);

// Route to get all messages
router.get('/', getAllMessages);

module.exports = router;

