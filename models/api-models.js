const db = require('../db/connection')

exports.readTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
        return rows;
    })
}

//convert created_at to string for test

exports.readSingleArticle = (article_id) => {
    return db.query(`
    SELECT * FROM articles 
    WHERE article_id = $1`, [article_id])
    .then (({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Article not found'})
        } 
       return rows[0]
    })
    .catch((err) => {
        return err;
    })
}

exports.readAllArticles = () => {
    return db.query(`
        SELECT 
        articles.author, 
        articles.title, 
        articles.article_id, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        articles.article_img_url,
        COUNT(comments.comment_id)::INTEGER AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;
        `)
        .then(({ rows }) => {
            //console.log(rows, '<<< rows from model')
            return rows;
        })
}