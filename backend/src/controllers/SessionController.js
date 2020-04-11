// recupera a conexão com o banco de dados
const connection = require('../database/connection');

// tabela alvo deste 'controller'
const table_name = 'ongs';

module.exports = {
  /**
   * Função que valida a sessão (POST) de uma 'ong', com base no 'uuid' informado.
   * 
   * @param {*} request - Objeto com as informações da requisição HTTP. 
   * @param {*} response - Objeto com as informações da resposta para a requisição 
   */
  async index(request, response) {

    // recupera do corpo da requisição o 'uuid' da 'ong' que pretende iniciar uma sessão no sistema
    const { id } = request.body;

    // tenta recuperar do banco de dados o nome da 'ong'
    const ong_name = await connection(table_name)
      .where('id', id)
      .select('name')
      .first();

    // se o nome da 'ong' não foi encontrado significa que o 'uuid' informado não está no sistema
    if (!ong_name) {
      return response
        .status(400)
        .json({ error: 'No ONG foun with this uuid!' })
    }

    return response.json(ong_name);
  }
}