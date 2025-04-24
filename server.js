const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();

// Middleware pour parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

// Connecter à MongoDB
connectDB();

// Routes
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));