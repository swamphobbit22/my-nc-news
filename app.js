const express = require('express');
const app = express();
const endpointsJson = require('./endpoints.json')
//const getApi = require('./controllers/api-controller')

app.get('/api', (req, res) => {
    res.status(200).send({ endpoints: endpointsJson})
})

module.exports = app;