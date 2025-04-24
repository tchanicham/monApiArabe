const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Arabe Facile API',
            version: '1.0.0',
            description: 'Documentation de l\'API pour la plateforme Arabe Facile',
        },
        servers: [
            { url: 'http://localhost:5000' },
        ],
    },
    apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les routes
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;