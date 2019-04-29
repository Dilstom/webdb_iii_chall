exports.seed = function(knex, Promise) {
 // Deletes ALL existing entries
 return knex('students')
  .del()
  .then(function() {
   // Inserts seed entries
   return knex('students').insert([
    { name: 'Roy Don', cohorts_id: 1 },
    { name: 'Jon Dow', cohorts_id: 2 },
    { name: 'Greg Grey', cohorts_id: 3 },
   ]);
  });
};
