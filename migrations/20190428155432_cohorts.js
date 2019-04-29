exports.up = function(knex, Promise) {
 return knex.schema.createTable('cohorts', function(tbl) {
  //primary key called id, integer, auto-increment
  tbl.increments();

  tbl
   .string('name', 128)
   .notNullable()
   .unique(); // sqlite ignores size but dbs
  tbl.timestamps(true, true);
  // another field
 });
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('cohorts');
};
