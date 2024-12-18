const express = require('express');
const commentsRouter = express.Router();
const { deleteCommentById, patchUpdatedVotes } = require('../controllers/comments-controller')


commentsRouter
.route('/:comment_id')
.delete(deleteCommentById)

commentsRouter
.route('/:comment_id/votes')
.patch(patchUpdatedVotes);

module.exports = commentsRouter;