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

exports.findUserbyId = (username) => {
   
    return db.query(`
        SELECT * from users
        WHERE username = $1
        `, [username])
        .then(( {rows} ) => {
            if(rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'user not found'})
            } 
           return rows;
        })
}