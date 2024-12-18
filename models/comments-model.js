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

exports.selectCommentsByUsername =({username}) => {
    return db.query(`
        SELECT * FROM comments
        WHERE author = $1
        ORDER BY created_at DESC
        `, [username])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'comment does not exist'})
            }
            return rows;
        })
}

exports.updateCommentVotes = (inc_votes, comment_id) => {

    if(typeof inc_votes !== 'number' || isNaN(inc_votes)){
        return Promise.reject({ status: 400, msg: 'inc_votes should be a number' })
    }

    return db.query(`
        SELECT votes 
        FROM comments
        WHERE comment_id = $1`, [comment_id])
        .then(({rows}) => {
            if(rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'comment not found'})
            } 
            
        const currVotes = rows[0].votes;
        const newVotes = currVotes + inc_votes;

    return db.query(`
        UPDATE comments
        SET votes = $1
        WHERE comment_id = $2 
        RETURNING *;`, 
        [newVotes, comment_id])
        .then(({rows}) => {
            return rows[0];
        })
    })
}