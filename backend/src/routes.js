const express =  require('express');

// obtém o objeto de roteamento do express
const routes = express.Router();

routes.post('/users', (request, response) => {
  const params = request.query;
  const body = request.body;

  console.log(params);
  console.log(body);

  return response.json({
    evento: 'Semana Omnistack 11.0',
    aluno: 'Marcos Lima'
  });
}); // rota raiz

module.exports = routes;
