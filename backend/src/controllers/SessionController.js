const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { id } = request.body;

    const ong_name = await connection('ongs')
    .where('id', id)
    .select('name')
    .first();

    if (!ong_name) {
      return response.status(400).json({error: 'No ONG foun with this id!'})
    }

    return response.json(ong_name);
  }
}