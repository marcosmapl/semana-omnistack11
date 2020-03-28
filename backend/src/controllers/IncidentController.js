table_name = 'incidents'
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection(table_name).count();

    const incidents = await connection(table_name)
      .limit(5)
      .offset((page - 1) * 5)
      .select('*');

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    // insert retorna um array unitário
    const [id] = await connection(table_name).insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection(table_name)
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      // not authorized
      return response.status(401).json({ error: "You are not the incident's owner" });
    }

    await connection(table_name).where('id', id).delete();

    return response.status(204).send();
  }
};