// recupera a conexão com o banco de dados
const connection = require('../database/connection');

// tabela alvo deste 'controller'
const table_name = 'incidents';

module.exports = {
  /**
   * Função de listagem (GET) de todas os 'incidentes' pertencentes a uma 'ong'.
   * É necessário passar no cabeçalho da requisição o 'uuid' da 'ong'
   * 
   * @param {*} request - Objeto com as informações da requisição HTTP. 
   * @param {*} response - Objeto com as informações da resposta para a requisição 
   */
  async index(request, response) {
    // recupera do cabeçalho da requisição o 'uuid' que identifica a 'ong'
    const ong_id = request.headers.authorization;

    // recupera do banco de dados todos os 'incidentes' da 'ong' de 'uuid' informado
    const incidents = await connection(table_name)
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);
  }
}