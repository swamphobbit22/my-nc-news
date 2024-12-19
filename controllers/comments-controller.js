const {insertComment, deleteComment, checkComment, updateCommentVotes, selectCommentsByUsername} = require('../models/comments-model');

exports.addComment = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body} = req.body


    if(isNaN(Number(article_id))){
        return res.status(400).send({ msg: 'invalid input'});
    }

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

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;

    if(isNaN(Number(comment_id))){
        return res.status(400).send({ msg: 'invalid input'});
    }

    Promise.all([
        checkComment(comment_id),
        deleteComment({comment_id})
    ])
    .then(() => {
        res.status(204).end();
    })
    .catch(next);
}

exports.patchUpdatedVotes = (req, res, next) => {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;

    updateCommentVotes(inc_votes, comment_id).then((updateVotes) => { 
        res.status(200).send({ comment: updateVotes })   
    })
    .catch((err) => {
        next(err)
    })
}

exports.getCommentsByUsername = (req, res, next) => {
    const { username } = req.params;

    if(!username) {
        return res.status(400).send({ error: "Username is required"});
    }

    selectCommentsByUsername({username}).then((comments) => {
        res.status(200).send({ comments })
    })
    .catch((err) => {
        next(err)
    })
}