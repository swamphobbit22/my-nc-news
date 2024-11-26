const db = require('../db/connection')

exports.insertComment = ({ username, body, article_id }) => {
    return db.query(`
        INSERT INTO comments 
        (author, body, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`, [username, body, article_id])
        .then(({ rows }) => {
            if(rows.length === 0) {
                return Promise.reject({ status: 400, msg: 'Cannot insert new comment'})
            }
            return rows[0];
        })
}
