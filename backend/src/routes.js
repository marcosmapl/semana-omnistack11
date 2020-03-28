const express =  require('express');
const OngController = require('./controllers/OngController');

// obtém o objeto de roteamento do express
const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

module.exports = routes;
