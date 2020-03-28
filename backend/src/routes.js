const express =  require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');

// obtém o objeto de roteamento do express
const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);

module.exports = routes;
