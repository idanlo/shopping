import request from 'supertest';
import app from '../src/app';

describe('GET /api', () => {
    it('/api/product/new - should return 404 if not all body parameters are passed', async () => {
        const response = await request(app)
            .post('/api/product/new')
            .send({
                name: 'Test'
            });
        expect(response.status).toEqual(404);
    });

    it('/api/product/new - should return error message if not all body parameters are passed', async () => {
        const response = await request(app)
            .post('/api/product/new')
            .send({
                name: 'Test'
            });
        expect(response.body.message).toEqual(
            'Please send fields: name, price and tags'
        );
    });

    it('/api/tags/all - should return an array of tags', async () => {
        const response = await request(app).get('/api/tags/all');
        // TODO
        expect(true).toBeTruthy();
    });
});
