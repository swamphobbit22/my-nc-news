const { readUsers } =  require('../models/users-model')

exports.getUsers = (req, res, next) => {
    readUsers().then((users)=> {
        res.status(200).send({ users })
    })
    .catch((err) => {
        next(err)
    })
}