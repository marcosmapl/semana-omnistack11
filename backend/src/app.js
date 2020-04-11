const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

// cross orign resource sharing for http requests
app.use(cors());

// define que as requisições devam ocorrer usando JSON
app.use(express.json());

/**
 * Rota ou Recurso
 * 
 * Métodos HTTP
 *  GET:      buscar informação no backend
 *  POST:     enviar informação para o backend
 *  PUT:      alterar informação no backend
 *  DELETE:   deletar informação no backend
 * 
 * Tipos de parâmetros
 *  QUERY PARAMS: parâmetros nomeados, enviados na rota (filtros ou paginação).
 *    https://localhost:3333/users?page=2&type=admin
 *  ROUTE PARAMS: parâmetros utilizados para identificar recursos.
 *    app.get('users/:id', ...)
 *    https://localhost:3333/users/1
 *  REQUEST BODY: corpo da requisição, utilizado para criar ou alterar recursos.
 * 
 * Banco de Dados
 *  SQL: MySQL, PostgreSQL, Oracle, Microsoft SQL Server, SQLite
 *  NOSQL: MongoDB, CouchDB, Cassandra, etc.
 * 
 * Queries
 *  Drivers: SELECT * FROM TABLE;
 *  Query Builder: table('users').select('*').where()
 */
// define as rotas da aplicação
app.use(routes);

// configura os erros retornados pela validação do módulo 'supertest'
app.use(errors());

module.exports = app;
