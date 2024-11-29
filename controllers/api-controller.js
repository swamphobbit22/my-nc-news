const { readSingleArticle, readAllArticles, readCommentsByArticleId, updateVotesByArticle, checkTopic} = require('../models/api-models')

exports.getWelcomeMsg = (req, res) => {
    res.send(`
        <h1 style="text-align:center" > Welcome to my NC News API.</h1>
        <br>
        <ul style="list-style-type:none">
        <b>Feel free to browse the endpoints:</b> 
        <li>GET<a href="/api "> /api</a> : Lists all available endpoints </li>
        <li>GET<a href="/api/topics"> /api/topics</a> : Returns all topics </li>
        <li>GET<a href="/api/articles"> /api/articles</a> : Returns all articles </li>
        <li>GET<a href="/api/articles/:article_id"> /api/articles/:article_id</a> : Returns a specific article (Replace :article with an article number)</li>
        <li>GET<a href="/api/articles/:article/comments"> /api/articles/:article/comments</a> : Returns a comment for a specified article (Replace :article with an article number) </li>
        <li>GET<a href="/api/users"> /api/users</a> : Returns all users </li>
        </ul>
        `)
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
    const { sort_by, order, topic } = req.query;

    readAllArticles(sort_by, order, topic).then((rows) => {
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
