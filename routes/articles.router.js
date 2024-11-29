const express = require('express');
const articlesRouter = express.Router();
const { getSingleArticle, getAllArticles, getCommentsByArticleId, patchUpdatedVotes } = require('../controllers/api-controller');
const { addComment } = require('../controllers/comments-controller')


articlesRouter
    .route('/')
    .get(getAllArticles);

articlesRouter
    .route('/:article_id')
    .get(getSingleArticle)
    .patch(patchUpdatedVotes);

articlesRouter
    .route('/:article_id/comments')
    .get(getCommentsByArticleId)
    .post(addComment);


module.exports = articlesRouter;