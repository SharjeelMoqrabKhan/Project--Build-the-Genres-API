const request = require('supertest');
let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close()});
    describe('GET /', () => {
        it('should return genres list', async () => {
            const res = await request(server).get('/vidly.com/api/genres');
            expect(res.status).toBe(200);
        });
    });
});