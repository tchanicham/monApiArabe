const Course = require('../models/Course');

// Ajouter un cours
exports.addCourse = async (req, res) => {
    try {
        const { title, description, lessons } = req.body;
        const course = new Course({ title, description, teacher: req.user.id, lessons });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Modifier un cours
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Cours non trouvé' });
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un cours
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Cours supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};