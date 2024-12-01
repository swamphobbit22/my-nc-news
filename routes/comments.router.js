const express = require('express');
const commentsRouter = express.Router();
const { deleteCommentById, patchUpdatedVotes } = require('../controllers/comments-controller')


commentsRouter
.route('/:comment_id')
.delete(deleteCommentById)
.patch(patchUpdatedVotes);


module.exports = commentsRouter;