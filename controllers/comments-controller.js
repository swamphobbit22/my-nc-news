const {insertComment} = require('../models/comments-model');

exports.addComment = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body} = req.body

    if (!username || !body){
        return res.status(400).send({ msg: 'Username and body are both required'})
    }

    insertComment({username, body, article_id}).then((newComment) => {
        res.status(201).send({ comment: newComment})
    })
    .catch((err) => {
        next(err)
    })
}