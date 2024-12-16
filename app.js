const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./routes/api.router');
const { pgErrorhandler, customErrorhandler, serverErrorhandler } = require('./errors/error-handling');
const { getWelcomeMsg } = require('./controllers/api-controller');

app.use(cors());
app.use(express.json());

app.get('/', getWelcomeMsg);

app.use('/api', apiRouter);



// Error handling
app.use(pgErrorhandler);
app.use(customErrorhandler);
app.use(serverErrorhandler)

  

module.exports = app;