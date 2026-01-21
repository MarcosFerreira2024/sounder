import { Application } from 'express';
import { apiReference } from '@scalar/express-api-reference';
import swaggerSpec from './openapiSpec'; // Renamed from swagger.ts

function setupScalar(app: Application) {
    app.get('/openapi.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use(
        '/reference',
        apiReference({
            spec: {
                url: '/openapi.json',
            },
        }),
    );
}

export { setupScalar };