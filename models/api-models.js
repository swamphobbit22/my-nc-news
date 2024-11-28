const db = require('../db/connection')

exports.readTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'topics not found'})
        } 
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
            return Promise.reject({ status: 404, msg: 'article not found'})
        } 
       return rows[0]
    })

}

exports.readAllArticles = (sort_by = 'created_at', order = 'desc', topic = null) => {

    const sortByColumns = [
        'author','title','article_id','topic','created_at','votes',
        'comment_count','article_img_url',
    ];

    const sortOrder = ['asc', 'desc'];

    if(!sortByColumns.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'invalid sort column'});
    }

    if(!sortOrder.includes(order)) {
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

        if(topic) {
            query += `WHERE articles.topic = $1`;
        }

        query += `
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order};
         `;

        const params = topic ? [topic] : [];

        return db.query(query, params)
        .then(({rows}) => {
            return rows;
        })
        .catch(err => {
            return Promise.reject({ status: 500, msg: 'Internal server error', error: err});
        })
}


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
