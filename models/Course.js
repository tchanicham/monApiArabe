const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: [
        {
            title: String,
            content: String,
            audioUrl: String,
            pdfUrl: String,
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);