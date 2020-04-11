// recupera a conexão com o banco de dados
const connection = require('../database/connection');

// importa a função de geração de 'uuid' para as 'ongs'
const generateUUID = require('../utils/generateUUID');

// tabela alvo deste 'controller'
const table_name = 'ongs';

module.exports = {
  /**
   * Função de listagem (GET) de 'ongs'.
   * 
   * @param {*} request - Objeto com as informações da requisição HTTP.
   * @param {*} response - Objeto com as informações da resposta para a requisição
   */
  async index(request, response) {

    // recupera todas as 'ongs' do banco de dados
    const ongs = await connection(table_name).select('*');

    return response.json(ongs);
  },

  /**
   * Função de cadastro (POST) de uma 'ong'.
   * 
   * @param {*} request - Objeto com as informações da requisição HTTP.
   * @param {*} response - Objeto com as informações da resposta para a requisição
   */
  async create(request, response) {
    // recupera os dados da 'ong' do corpo da requisição
    const { name, email, whatsapp, city, uf } = request.body;

    // utiliza a função 'generateUUID' pra criar um novo 'uuid v4' para a 'ong'
    const id = generateUUID();

    // insere a 'ong' no banco de dados
    await connection(table_name).insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    // é retornado um objeto com o 'uuid' gerado para a 'ong'
    return response.json({ id });
  },
  
  /**
   * Função de exclusão (DELETE) de um 'incidente'.
   * @param {*} request - Objeto com as informações da requisição HTTP. 
   * @param {*} response - Objeto com as informações da resposta para a requisição 
   */
  async delete(request, response) {
    
    // recuperar o 'uuid' do 'ong' a ser excluída
    const { id } = request.params;
    
    // recupera do cabeçalho da requisiao o 'uuid' da 'ong' responsável pela requisição
    const ong_id = request.headers.authorization;
    
    // se 'ong.id' for diferente do 'uuid' da 'ong' reponsávle pela requisição
    // significa que a 'ong' está tentando excluír outra 'ong', ao invés dela própria
    // e isso não é permitido 
    if (id !== ong_id) {
      // not authorized
      return response.status(401).json({ error: "You are can not delete another ong!" });
    }

    // caso contrário, posseguimos com a exlusão dos 'incidentes' pertencentes a 'ong'
    // e logo em seguida com a exclusão da própria 'ong'
    await connection('incidents').where('ong_id', ong_id).delete();
    await connection(table_name).where('id', ong_id).delete();

    return response.status(204).send();
  }
};