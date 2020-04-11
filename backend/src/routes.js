const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// obtém o objeto de roteamento do express
const routes = express.Router();

// ONG ROUTES

// rota responsável por validar o acesso da 'ong' ao sistema (logon).
// o 'id' da 'ong' deve ser enviado no corpo da requisição
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), SessionController.index);

// rota de listagem de 'ongs'. 
routes.get('/ongs', OngController.index);

// rota de inclusão de 'ongs' (cadastro)
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(13).max(14),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

// rota de listagem dos 'incidentes' da 'ong'
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

// rota de exclusão de uma 'ong' e seus 'incidentes'
routes.delete('/ongs/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), OngController.delete);

// INCIDENTS ROUTES

// rota de 'inclusão' de um 'incidente' de uma 'ong'
// o 'id' da 'ong' deve ser passado como 'authorization' no cabeçalho da requisição
// os dados do 'incidente' devem vir no corpo da requisição
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().positive().min(10),
  }),
}), IncidentController.create);

// rota de listagem dos 'incidentes'
// o parametro 'page' é utilizado apenas para paginação (opcional)
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);

// rota de exclusão de 'incidente'
// o 'id' do 'incidente' deve ser passado no parametro 'id' da url
// o 'id' da 'ong' da registrada é enviado no cabeçalho da requisição e deve ser o mesmo que o cadastrado no banco de dados.
routes.delete('/incidents/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);

module.exports = routes;
