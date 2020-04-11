const { v4 } = require('uuid');

module.exports = function generateUUID() {
  return v4();
}