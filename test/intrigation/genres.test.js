const request = require('supertest');
const {Genre} = require('../../model/genreModel');
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
                {name:'genre1'},
                {name:'genre2'},
            ])
            const res = await request(server).get('/vidly.com/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g=>g.name==='genre1')).toBeTruthy();
            expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();
        });
    });
});