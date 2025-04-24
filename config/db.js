const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connecté à MongoDB');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB', err);
        process.exit(1); // Arrêter le serveur en cas d'erreur
    }
};

module.exports = connectDB;