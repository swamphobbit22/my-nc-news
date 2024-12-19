const express = require('express');
const commentsRouter = express.Router();
const { deleteCommentById, patchUpdatedVotes } = require('../controllers/comments-controller')


commentsRouter
.route('/:comment_id')
.delete(deleteCommentById)

commentsRouter
.route('/:comment_id/votes')
.patch(patchUpdatedVotes);

commentsRouter
.route('/user/:username')
.get(getCommentsByUsername);

module.exports = commentsRouter;