import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sounder API',
            version: '1.0.0',
            description: 'API documentation for the Sounder application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/modules/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
