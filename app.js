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



// app.use((err, req, res, next) => {
//     if(err.status){
//       res.status(404).send({msg: "Does not exist"})
//     } else {
//       next(err);
//     }
//   })
  
//   app.use((err, req, res, next) => {
//     if(err.status){
//       res.status(204).send({msg: "No Content"})
//     } else {
//       next(err);
//     }
//   })
  
//   app.use((err, req, res, next) => {
//       res.status(400).send({ msg: "Bad request"})
//   })

//   app.use((err, req, res, next) => {
//     if(err.status){
//         res.status(err.status).send({ msg: err.msg});
//     } else {
//         res.status(500).send({ msg: 'Internal Server Error'});
//     }
//   })
  

module.exports = app;