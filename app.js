const express = require('express');
const app = express();
const endpointsJson = require('./endpoints.json');
const { getTopics , getSingleArticle, getAllArticles, getCommentsByArticleId, patchUpdatedVotes } = require('./controllers/api-controller');
const { addComment, deleteCommentById } = require('./controllers/comments-controller')
const { pgErrorhandler, customErrorhandler, serverErrorhandler } = require('./errors/error-handling');
const { getEndpoints } = require('./controllers/endpoints-controller');

app.use(express.json());


app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getSingleArticle)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', addComment);

app.patch('/api/articles/:article_id', patchUpdatedVotes);

app.delete('/api/comments/:comment_id', deleteCommentById )





// Error handling
app.use(pgErrorhandler);

app.use(customErrorhandler);

app.use(serverErrorhandler)

  

module.exports = app;