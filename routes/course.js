const express = require('express');
const { addCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Ajouter un cours (protégée pour enseignants et admins)
router.post('/', authMiddleware(['teacher', 'admin']), addCourse);

// Modifier un cours (protégée pour enseignants et admins)
router.put('/:id', authMiddleware(['teacher', 'admin']), updateCourse);

// Supprimer un cours (protégée pour enseignants et admins)
router.delete('/:id', authMiddleware(['teacher', 'admin']), deleteCourse);

module.exports = router;