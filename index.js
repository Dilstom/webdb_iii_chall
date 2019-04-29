const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const knexConfig = {
 client: 'sqlite3',
 connection: {
  filename: './data/lambda.sqlite3',
 },
 useNullAsDefault: true,
};

const db = knex(knexConfig);

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', async (req, res) => {
 try {
  const cohort = await db('cohorts');
  res.status(200).json(cohort);
 } catch (error) {
  res.status(500).json(error);
 }
});

server.get('/api/cohorts/:id', async (req, res) => {
 try {
  const cohort = await db('cohorts').where({ id: req.params.id });
  console.log(cohort.length);
  if (cohort.length > 0) {
   res.status(200).json(cohort);
  } else {
   res.status(404).json({ message: 'No record with this id' });
  }
 } catch (error) {
  res.status(500).json(error);
 }
});

server.get('/api/cohorts/:id/students', async (req, res) => {
 try {
  const cohort = await db('students').where('cohorts_id', req.params.id);
  if (cohort.length > 0) {
   res.status(200).json(cohort);
  } else {
   res.status(404).json({ message: 'No record with this id' });
  }
 } catch (error) {
  res.status(500).json(error);
 }
});

server.delete('/api/cohorts/:id', async (req, res) => {
 try {
  const cohort = await db('cohorts')
   .where({ id: req.params.id })
   .del();
  if (cohort > 0) {
   res.status(204).end();
  } else {
   res.status(404).json({ message: 'Record with this id is not found' });
  }
 } catch (error) {
  res.status(500).json(error);
 }
});

server.put('/api/cohorts/:id', async (req, res) => {
 try {
  const cohort = await db('cohorts')
   .where({ id: req.params.id })
   .update(req.body);

  if (cohort > 0) {
   const record = await db('cohorts')
    .where({ id: req.params.id })
    .first();
   res.status(204).json(record);
  } else {
   res.status(404).json({ message: 'Record with this id is not found' });
  }
 } catch (error) {
  res.status(500).json(error);
 }
});

const errors = {
 '19': 'The value already exists',
};

server.post('/api/cohorts', async (req, res) => {
 try {
  const [id] = await db('cohorts').insert(req.body);

  const role = await db('cohorts')
   .where({ id })
   .first();

  res.status(201).json(role);
 } catch (error) {
  const message = errors[error.errno] || 'We ran into an error';
  res.status(500).json({ message, error });
 }
});

server.listen(5500, () => console.log('App listening port 5500'));
