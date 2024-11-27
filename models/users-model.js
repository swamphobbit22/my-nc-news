const db = require('../db/connection')

exports.readUsers = () => {
    return db.query(`SELECT * FROM users;`)
    .then(({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'users not found'})
        } 
       return rows;
    })
}