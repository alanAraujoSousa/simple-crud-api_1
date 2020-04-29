require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const environment = process.env.NODE_ENV;

// api routes
app.use('/pessoa', require('./pessoas/pessoa.controller'));
app.use('/curso', require('./cursos/curso.controller'));

// global error handler
app.use(errorHandler);

if (environment !== 'production') {
  app.use(logger('dev'));
}

// start server
const port = environment === 'production' ? (process.env.PORT || 80) : 4000;

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, function () {
      console.log('The crud-api is listening on port ' + port);
  });
}

module.exports = app