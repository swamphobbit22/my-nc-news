const {readTopics, readSingleArticle, readAllArticles} = require('../models/api-models')

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
    readAllArticles().then((rows) => {
        
        res.status(200).send({ articles: rows })
    })
    .catch((err) => {
        next(err)
    })
}