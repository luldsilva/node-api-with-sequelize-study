const bodyParser = require('body-parser');
const people = require('./peopleRoute');
const niveis = require('./niveisRoute');
const turmas = require('./turmasRoute');

module.exports = app => {
  app.use(
    bodyParser.json(),
    people,
    niveis,
    turmas
  );
}