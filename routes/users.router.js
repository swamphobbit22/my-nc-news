const express = require('express');
const usersRouter = express.Router();
const { getUsers, getUserbyId } = require('../controllers/users-controller')

usersRouter
.route('/')
.get(getUsers);

usersRouter
.route('/:username')
.get(getUserbyId)

module.exports = usersRouter;