const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Inscription
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email déjà utilisé' });

        // Créer un nouvel utilisateur
        user = new User({ name, email, password, role });
        await user.save();

        // Envoyer un email de confirmation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.verificationToken = token;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vérifiez votre email',
            text: `Cliquez sur ce lien pour vérifier votre email : http://localhost:3000/verify?token=${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.error(error);
            else console.log('Email envoyé : ' + info.response);
        });

        res.status(201).json({ message: 'Inscription réussie. Veuillez vérifier votre email.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Connexion
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Trouver l'utilisateur
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

        // Comparer le mot de passe
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

        // Générer un token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};