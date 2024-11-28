const {readTopics, readSingleArticle, readAllArticles, readCommentsByArticleId, updateVotesByArticle} = require('../models/api-models')

exports.getTopics = (req, res, next) => {
    readTopics().then((topics)=> { 
        res.status(200).send({ topics })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getSingleArticle = (req, res, next) => {
    const { article_id } = req.params

    readSingleArticle(article_id).then((article) => {
        res.status(200).send({ articles: [article]})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getAllArticles = (req, res, next) => {
    const { sort_by, order } = req.query;

    readAllArticles(sort_by, order).then((rows) => {
        res.status(200).send({ articles: rows })
    })
    .catch((err) => {
        next(err)
    })
}


exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    readCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({ comments: comments })   
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchUpdatedVotes = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    updateVotesByArticle(inc_votes, article_id).then((updateArticle) => {
        res.status(200).send({ article: updateArticle })   
    })
    .catch((err) => {
        next(err)
    })
}
