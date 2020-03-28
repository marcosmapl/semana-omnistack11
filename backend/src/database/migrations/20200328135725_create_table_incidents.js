const table_name = 'incidents';
exports.up = function(knex) {
  knex.schema.createTable(table_name, function (talbe) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable(table_name);
};
