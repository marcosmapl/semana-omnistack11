const table_name = 'ongs'

/**
 * ONG table 'create' schema function
 */
exports.up = function(knex) {
  return knex.schema.createTable(table_name, function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

/**
 * ONG table 'drop' schema function
 */
exports.down = function(knex) {
  return knex.schema.dropTable(table_name);
};
