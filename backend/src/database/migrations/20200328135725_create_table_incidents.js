const table_name = 'incidents'

/**
 * INCIDENT table 'create' schema function
 */
exports.up = function(knex) {
  return knex.schema.createTable(table_name, function (table) {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

/**
 * INCIDENT table 'drop' schema function
 */
exports.down = function(knex) {
  return knex.schema.dropTable(table_name);
};
