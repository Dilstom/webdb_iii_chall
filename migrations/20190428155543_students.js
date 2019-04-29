exports.up = function(knex, Promise) {
 return knex.schema.createTable('students', function(tbl) {
  //primary key called id, integer, auto-increment
  tbl.increments();

  tbl
   .string('name', 128)
   .notNullable()
   .unique(); // sqlite ignores size but dbs
  tbl
   .integer('cohorts_id')
   .unsigned()
   .references('id')
   .inTable('cohorts')
   .onDelete('CASCADE')
   .onUpdate('CASCADE');
  tbl.timestamps(true, true);
  // another field
 });
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('students');
};
