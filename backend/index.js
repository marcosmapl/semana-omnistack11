const express =  require('express');

const app = express();

app.use(express.json()); // define que as requisições devam ocorrer usando JSON

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
 */


app.post('/users', (request, response) => {
  const params = request.query;
  const body = request.body;

  console.log(params);
  console.log(body);

  return response.json({
    evento: 'Semana Omnistack 11.0',
    aluno: 'Marcos Lima'
  });
}); // rota raiz

app.listen(3333);
