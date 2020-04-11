const table_name = 'ongs'
const connection = require('../database/connection');
const generateUUID = require('../utils/generateUUID');

module.exports = {
  async index(request, response) {
    const ongs = await connection(table_name).select('*');

    return response.json(ongs);
  },
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUUID();

    await connection(table_name).insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  }
};