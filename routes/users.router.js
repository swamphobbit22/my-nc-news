const express = require('express');
const usersRouter = express.Router();
const { getUsers } = require('../controllers/users-controller')

usersRouter
.route('/')
.get(getUsers);

module.exports = usersRouter;