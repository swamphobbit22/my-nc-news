const { readUsers, findUserbyId } =  require('../models/users-model')

exports.getUsers = (req, res, next) => {
    readUsers().then((users)=> {
        res.status(200).send({ users })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getUserbyId = (req, res, next) => {
    const { username } = req.params;

    findUserbyId(username).then((user) => {
        if(!user) {
            return res.status(404).send({ msg: 'User not found'})
        }
        res.status(200).send(user)
    })
    .catch((err) => {
        next(err)
    })
}