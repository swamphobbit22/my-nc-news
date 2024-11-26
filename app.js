const express = require('express');
const app = express();
const endpointsJson = require('./endpoints.json');
const { getTopics , getSingleArticle, getAllArticles, getCommentsByArticleId } = require('./controllers/api-controller');
const { pgErrorhandler, customErrorhandler, serverErrorhandler } = require('./errors/error-handling');



app.get('/api', (req, res) => {
    res.status(200).send({ endpoints: endpointsJson})
})

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getSingleArticle)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)





// Error handling
app.use(pgErrorhandler);

app.use(customErrorhandler);

app.use(serverErrorhandler)

  

module.exports = app;