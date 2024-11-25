const { promiseHooks } = require('v8');
const db = require('../db/connection')

exports.readTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
        console.log(rows)
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
        console.log(rows, '<<< rows')
       return rows[0]
    })
    .catch((err) => {
        return err;
    })
}