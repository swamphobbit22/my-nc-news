\c nc_news_test

SELECT * FROM articles
WHERE article_id = 2;

\d articles

\d comments

        SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;

        SELECT * FROM comments;

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

        INSERT INTO comments 
        (author, body, article_id)
        VALUES ('lurker', 'This is a test comment, nothing special.', 5)
        RETURNING *;
        
        \d users
  
        \dt

        \d articles
        \d comments

        SELECT * FROM articles WHERE article_id = 5;
        SELECT * FROM comments WHERE author = 'lurker';
        SELECT * FROM articles WHERE article_id = 5;

        SELECT * FROM articles;

        SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;

        -- UPDATE articles
        -- SET votes = $1,
        -- WHERE article_id = $2

        SELECT * FROM users;