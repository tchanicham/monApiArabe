const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Envoyer un message (protégée)
router.post('/send', authMiddleware(['student', 'teacher', 'admin']), sendMessage);

// Lire les messages (protégée)
router.get('/messages/:recipientId', authMiddleware(['student', 'teacher', 'admin']), getMessages);

module.exports = router;