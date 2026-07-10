const request = require('supertest');
const app = require('../src/server');

describe('TechFlow App', () => {
  test('GET /health -> 200 & status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
  test('GET / -> 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});