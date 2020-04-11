// recupera a conexão com o banco de dados
const connection = require('../database/connection');

// tabela alvo deste 'controller'
table_name = 'incidents';

module.exports = {
  /**
   * Função de listagem (GET) de 'incidentes'.
   * 
   * @param {*} request - Objeto com as informações da requisição HTTP.
   * @param {*} response - Objeto com as informações da resposta para a requisição
   */
  async index(request, response) {
    
    // recupera o 'query param' de paginação da lista de 'incidentes'.
    const { page = 1 } = request.query;
    
    // recupera de forma assíncrona o total de 'incidentes' cadastrados no banco.
    const [count] = await connection(table_name).count();
    
    // recupera de forma assíncrona 5 'incidentes' do banco de dados
    // utilizando como 'offset' o valor do parametro 'page'.
    const incidents = await connection(table_name)
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    // adiciona o total de incidentes ao cabeçalho da resposta
    response.header('X-Total-Count', count['count(*)']);
    
    return response.json(incidents);
  },

  /**
   * Função de cadastro (POST) de um 'incidente' para uma determinada 'ong' existente.
   * É necessário que a 'ong' esteja identificada no sistema.
   * @param {*} request - Objeto com as informações da requisição HTTP.
   * @param {*} response - Objeto com as informações da resposta para a requisição
   */
  async create(request, response) {
    
    // recupera do corpo da requisição os dados do 'incidente'
    const { title, description, value } = request.body;
    
    // recupera do cabeçalho da requisição o 'uuid' da 'ong' responsável pela requisição
    const ong_id = request.headers.authorization;

    // insere o 'incidente' no banco de dados, e recupera o 'id' gerado pelo banco
    const [id] = await connection(table_name).insert({
      title,
      description,
      value,
      ong_id,
    });

    // em caso de sucesso, retorna para o cliente uma objeto json com o 'id' gerado para o 'incidente'
    return response.json({ id });
  },

  /**
   * Função de exclusão (DELETE) de um 'incidente'.
   * @param {*} request - Objeto com as informações da requisição HTTP. 
   * @param {*} response - Objeto com as informações da resposta para a requisição 
   */
  async delete(request, response) {
    
    // recuperar o 'id' do incidente a ser excluído
    const { id } = request.params;
    
    // recupera do cabeçalho da requisiao o 'uuid' da 'ong' responsável pela requisição
    const ong_id = request.headers.authorization;

    // recupera do banco de dados o 'uuid' da 'ong' que é responsável pelo 'incidente'
    const incident = await connection(table_name)
      .where('id', id)
      .select('ong_id')
      .first();

    // se 'incident.ong_id' for diferente do 'uuid' da 'ong' reponsávle pela requisição
    // significa que a 'ong' não foi quem cadastrou o 'incidente' e não podemos prosseguir com a exclusão 
    if (incident.ong_id !== ong_id) {
      // not authorized
      return response.status(401).json({ error: "You are not the incident's owner" });
    }

    // caso contrário, posseguimos com a exlusão do 'incidente'
    await connection(table_name).where('id', id).delete();

    return response.status(204).send();
  }
};