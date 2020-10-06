const { Genre } = require('../../model/genreModel');
const request = require('supertest');
let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        server.close(),
            await Genre.remove({});
    });
    describe('GET /', () => {
        it('should return genres list', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ])
            const res = await request(server).get('/vidly.com/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });
    describe('GET /:id', () => {
        it('should return a valid genre id if exsists', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

           const res = await request(server).get('/vidly.com/api/genres/' + genre._id);
           expect(res.status).toBe(200);
           expect(res.body).toHaveProperty('name',genre.name);
           
        });
    });

    describe('GET /:id', () => {
        it('should return a 404 if genre id if not exsists', async () => {
           const res = await request(server).get('/vidly.com/api/genres/1');
           expect(res.status).toBe(404);
           
        });
    });
});