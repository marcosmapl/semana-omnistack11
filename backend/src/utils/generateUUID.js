const { v4 } = require('uuid');

/**
 * Gera 'uuid' utilizando o módulo 'uuid'
 * exemplo: 123e4567-e89b-12d3-a456-556642440000
 */
module.exports = function generateUUID() {
  return v4();
}