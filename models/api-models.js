const { promiseHooks } = require('v8')
const db = require('../db/connection')

exports.readSingleArticle = (article_id) => {
    return db.query(`
        SELECT 
        articles.author, 
        articles.title, 
        articles.article_id, 
        articles.topic, 
        articles.body,
        articles.created_at, 
        articles.votes, 
        articles.article_img_url,
        COUNT(comments.comment_id)::INTEGER AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id 
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`, [article_id])
    .then (({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'article not found'})
        } 
       return rows[0]
    })
}

//the original function
exports.readAllArticles = (sort_by = 'created_at', order = 'desc', topic = null) => {

    const validSortColumns = [
            'author','title','article_id','topic','created_at','votes',
            'comment_count','article_img_url',
    ];

    const validSortOrder = ['asc', 'desc'];

    if(!validSortColumns.includes(sort_by)) {
         return Promise.reject({ status: 400, msg: 'invalid sort column'});
    }

    if(!validSortOrder.includes(order)) {
         return Promise.reject({ status: 400, msg: 'invalid sort order'});
    }

    let query = `
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
        `;

    const params = [];

    if (topic) {
        query += `WHERE articles.topic = $1 AND articles.topic IN (SELECT slug FROM topics)`;
        params.push(topic)
    }
    
    query += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}`, [topic];

    return db.query(query, params)
        .then(({ rows }) => {
            if(topic && rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'not found'})
            }
            return rows;
        })
        .catch(err => {
            return Promise.reject(err.status ? err : { status: 500, msg: 'Internal server error', error: err})
        });
};


exports.readCommentsByArticleId = (article_id) => {
    return db.query(`
        SELECT 
            comment_id, 
            votes, 
            created_at, 
            author, 
            body, 
            article_id 
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC 
        `, [article_id]) 
    .then (({ rows }) => {
         if(rows.length === 0) {
             return Promise.reject({ status: 404, msg: 'article not found'})
         } 
         return rows;
    })
}


exports.updateVotesByArticle = (inc_votes, article_id) => {

    if(typeof inc_votes !== 'number' || isNaN(inc_votes)){
        return Promise.reject({ status: 400, msg: 'inc_votes should be a number' })
    }

    return db.query(`
        SELECT votes 
        FROM articles
        WHERE article_id = $1`, [article_id])
        .then(({rows}) => {
            if(rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'article not found'})
            } 
            
        const currVotes = rows[0].votes;
        const newVotes = currVotes + inc_votes;

    return db.query(`
        UPDATE articles
        SET votes = $1
        WHERE article_id = $2 
        RETURNING *;`, 
        [newVotes, article_id])
        .then(({rows}) => {
            return rows[0];
        })
    })
}

exports.checkTopic = (topic) => {
    return db.query(`
        SELECT * FROM topics WHERE topic = $1`, [topic])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'topic does not exist'})
            }
            return rows; 
        })
}

exports.insertArticle = ({author, title, body, topic, article_img_url}) => {
   const query= `
        INSERT INTO articles 
        (author, title, body, topic, article_img_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`
       
        const values = [author, title, body, topic, article_img_url || 'default_url.jpg'];

        return db.query(query, values)
        .then((result) => {      
            if(!result.rows.length === 0) {
                return Promise.reject({ status: 500, msg: 'Insert article failed'})
            }
            return result.rows[0];
        })
};

exports.validateAuthor = (author) => {
    return db.query(`
        SELECT * FROM users WHERE username = $1`, [author])
        .then((result) => {
            if(!result.rows.length) {
                return Promise.reject({ status: 404, msg: 'Author not found'})
            }
            return result;
        })
}

exports.validateTopic = (topic) => {
    return db.query(`
        SELECT * FROM topics WHERE slug = $1`, [topic])
        .then((result) => {
            if(!result.rows.length) {
                return Promise.reject({ status: 404, msg: 'Topic not found'})
            }
            return result;
        })
}

