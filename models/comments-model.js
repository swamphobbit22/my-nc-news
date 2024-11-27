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
        .catch((err) => {
            //catch foreign key error
            if (err.code = '23503'){
                
                return Promise.reject({ status: 404, msg: 'article not found'})
            } 
            //otherwise send to error handler
            throw err;
        });
};

exports.checkComment = (comment_id) => {
    return db.query(`
        SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'comment does not exist'})
            }
            return rows[0]
        })
}

exports.deleteComment = ({comment_id}) => {
    return db.query(`
        DELETE FROM comments
        WHERE comment_id = $1`, [comment_id])
}