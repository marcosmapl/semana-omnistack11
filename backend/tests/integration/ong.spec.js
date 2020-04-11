const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "nome ong",
        email: "email@domain.com",
        whatsapp: "+5599987654321",
        city: "cidade teste",
        uf: "aa"
      });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(36);
  });
});