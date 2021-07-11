const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Mestre Pokémon',
            version: '1.0.0',
            description: 'Temos que pegar!',
            contact: {
                name: 'Pablo Roxo',
                email: 'pabloricardoroxosilva@gmail.com',
            },
            servers: [{ url: 'http://localhost:3000' }]
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    security: [{ bearerAuth: [] }],
    apis: [ 'api/docs/*.js' ],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;