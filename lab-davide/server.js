'use strict';

//*boiler plate*. This will not change much between any server//

//npm modules//
const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('authdemo:server' );
const mongoose = require('mongoose');
const httpErrors = require('http-errors');
// const httpErrors = require('http-errors');

//app modules//
const handleError = require('./lib/handle-error');
const authRouter = require('./route/auth-router');


//const variables//
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/authdemodev';

//set up mongo//
mongoose.connect(mongoURI);

//set up middleware//
app.use(morgan('dev'));

//set up routes//
app.use('/api', authRouter);

app.all('*', function(req, res, next) {
  debug('404 * route');
  next(httpErrors(404, 'no such route'));
});

app.use(handleError);

//start server//
const server = app.listen(port, function() {
  debug('server is up', port);
});

server.isRunning = true;
module.exports = server;
