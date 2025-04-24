const express = require('express');
const { register, login } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Inscription (non protégée)
router.post('/register', register);

// Connexion (non protégée)
router.post('/login', login);

// Profil utilisateur (protégée)
router.get('/profile', authMiddleware(['student', 'teacher', 'admin']), async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;