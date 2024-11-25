# Northcoders News API

Instructions

If you would like to clone this repository you will not have access to the environment variables. To ensure you can connect to the database locally you will need to create the environment variable files .env.test and .env.development in the root of the project, and add the variables for the database connection PGDATABASE=nameofdatabase - replace 'nameofdatabase' with the database you wish to connect to. Once this has been done you will be able to run the application locally with your specified database.

API descriptions:


GET /api/topics
---------------
This returns an array of topics. 
Fields returned are:

description
slug

      [
        { slug: 'mitch', description: 'The man, the Mitch, the legend' },
        { slug: 'cats', description: 'Not dogs' },
        { slug: 'paper', description: 'what books are made of' }
      ]

GET /api/articles
-----------------
This returns an array of all the articles sorted by the date created ('created_at') in desceding order.
The fields returned are:

article_id
title
author
topic
created_at
votes
article_img_url
comment_count

here is an example response:
        [{
          author: 'butter_bridge',
          title: 'Living in the shadow of a great man',
          article_id: 1,
          topic: 'mitch',
          created_at: 2020-07-09T20:11:00.000Z,
          votes: 100,
          article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
          comment_count: 11
        }],

--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
