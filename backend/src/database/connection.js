// importa o módulo 'knex' (query builder)
const knex = require('knex');

// carrega as configurações do arquivo 'knexfile.js'
const configuration = require('../../knexfile');

// seleciona a configuração de acordo com o ambiente de execução
// se estivermos executando apenas os testes ('test') usa 'configuration.test' (banco de dados de testes: 'test.sqlite3')
// caso contrário usa 'configuration.development' (banco de dados de desenvolvimento: 'db.sqlite3')
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// cria uma conexão com o banco de dados selecionado
const connection = knex(config);

module.exports = connection;