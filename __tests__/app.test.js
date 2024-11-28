const endpointsJson = require("../endpoints.json");
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const db = require('../db/connection')
const app = require('../app')
const request = require('supertest');





/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
  return seed(testData)
});

afterAll (() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });

  it('should return an array of topics', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body}) => {
      expect(body.topics).toHaveLength(3)
      body.topics.forEach((topic) => {
        expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
           
        })
    })
  })
})


it('should return an article with a specific id ', () => {
  return request(app)
  .get('/api/articles/2')
  .expect(200)
  .then(({ body }) => {
    const expectedOutput = [{
          article_id: 2,
          title:'Sony Vaio; or, The Laptop',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
          created_at: expect.anything(),
          votes: 0,
          article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
        }]
        expect(body.articles).toEqual(expectedOutput);
      })
    });

      it('should respond with a 400 error if article id is invalid - not a number', () => {
        return request(app)
        .get('/api/articles/banana')
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe('Invalid input')
        })
      });

      it('should respond with a 404 error msg if article does not exist', () => {
      return request(app)
      .get('/api/articles/16')
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('article not found')
      })
    });
});

describe('get /api/articles', () => {
it('should return an array of articles' , () => {
  return request(app)
  .get('/api/articles')
  .expect(200)
  .then(({ body }) => {
    expect(Array.isArray(body.articles)).toBe(true)
  })
})

  it('should return all articles with a comment count to be sorted by descending order of date created', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({ body }) => {
      expect(body.articles).toHaveLength(13)
      body.articles.forEach((article) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.anything(),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(Number)
        })
      })
    })  
  })

  it('should return articles sorted by votes', () => {
    return request(app)
    .get('/api/articles?sort_by=votes&order=asc')
    .expect(200)
    .then(({ body }) => {
     expect(body.articles).toBeSortedBy('votes', {descending: false})
    })  
  }) 

  it('should return articles sorted by author', () => {
    return request(app)
    .get('/api/articles?sort_by=author&order=desc')
    .expect(200)
    .then(({ body }) => {
     expect(body.articles).toBeSortedBy('author', {descending: true})
    })  
  }) 

  it.only('should filter the articles by topic', () => {
    return request(app)
    .get('/api/articles?topic=cats')
    .expect(200)
    .then(({ body }) => {
        body.articles.forEach((article) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: 'cats',
          created_at: expect.anything(),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(Number)
        })
      })
    })
  })

  //not working - i need to revisit these
  it.skip('should handle a topic that does not exist', () => {
    return request(app)
    .get('/api/articles?topic=999')
    .expect(404)
    .then(({ body }) => {
      const { msg } = body;
      expect(msg).toBe('not found')
    })
  })

  it.skip('should handle an invalid topic ', () => {
    return request(app)
    .get('/api/articles?topic=invalid_topic')
    .expect(400)
    .then(({ body }) => {
      const { msg } = body;
      expect(msg).toBe('Invalid input')
    })
  })

})

describe('GET /api/articles/:article_id/comments', () => {
  it('should return all comments for a given article', () => {
    return request(app)
    .get('/api/articles/3/comments')
    .expect(200)
    .then(({ body }) => { 
      body.comments.forEach((comment) => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number), 
          created_at: expect.any(String) ,
          author: expect.any(String) ,
          body: expect.any(String),
          article_id: expect.any(Number),
        })
      })
 
      expect(body.comments).toBeSortedBy('created_at', {descending: true})
    })
  });

it('should respond with 400 error with an invalid id', () => {
    return request(app)
    .get('/api/articles/banana/comments')
    .expect(400)
    .then(({ body }) => {
      const { msg } = body;
      expect(msg).toBe('Invalid input')
    })
 })

 it('should respond with 404 error with an id that does not exist', () => {
  return request(app)
  .get('/api/articles/999/comments')
  .expect(404)
  .then(({ body }) => {
    const { msg } = body;
    expect(msg).toBe('article not found')
  })
})

})

describe('POST /api/articles/:article_id/comments', () => {
  it('201 - successfully created - should add a comment for an article', () => {
    const addNewComment = {username: 'lurker', body: 'Scooby Scooby Doo, where are you? Hey, Scooby, leave those cats alone! All in all you are just another dog with a bone!'}
    return request(app)
    .post('/api/articles/11/comments')
    .send(addNewComment)
    .expect(201)
    .then(({body}) => {
      expect(body.comment).toMatchObject({
        author: addNewComment.username,
        body: addNewComment.body,
        article_id: 11
      });  
    })
  })

  it('400 - should respond with 400 error with an invalid input - article id', () => {
    const addNewComment = {username: 'lurker', body: 'Scooby Scooby Doo, where are you? Hey, Scooby, leave those cats alone! All in all you are just another dog with a bone!'}
    return request(app)
    .post('/api/articles/banana/comments')
    .send(addNewComment)
    .expect(400)
    .then(({body}) => {
      const { msg } = body;
      expect(msg).toBe('invalid input');
    })
  })

  it('404 - should respond with 404 error with an id that does not exist in the database', () => {
    const addNewComment = {username: 'lurker', body: 'Scooby Scooby Doo, where are you? Hey, Scooby, leave those cats alone! All in all you are just another dog with a bone!'}
    return request(app)
    .post('/api/articles/999/comments')
    .send(addNewComment)
    .expect(404)
    .then(({body}) => {
      const { msg } = body;
      expect(msg).toBe('article not found');
    })
  })
})

describe('PATCH /api/articles/:article_id', () => {
  it('should successfully update an article by article_id', () => {
    const updateObj = { inc_votes: 55 }
    const expectedOutput = [{
      article_id: 2,
      title:'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: expect.anything(),
      votes: 55,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    }]
    return request(app)
    .patch('/api/articles/2')
    .send(updateObj)
    .expect(200)
    .then(({ body }) => {
      expect(body.article).toEqual(expectedOutput[0]);
    })
  })

  it('400 - should respond with 400 error if inc_votes is not a number', () => {
    const updateObj = { inc_votes: 'banana' };
    return request(app)
    .patch('/api/articles/2')
    .send(updateObj)
    .expect(400)
    .then(({body}) => {
      const { msg } = body;
      expect(msg).toBe('inc_votes should be a number');
    })
  })

  it('404 - should respond with 404 error if the article does not exist', () => {
    const updateObj = { inc_votes: 55 };
    return request(app)
    .patch('/api/articles/999')
    .send(updateObj)
    .expect(404)
    .then(({body}) => {
      const { msg } = body;
      expect(msg).toBe('article not found');
    })
  })

})

describe('DELETE /api/comments/:comment_id', () => {
  it('204 - no content - should delete comment by comment_id', () => { 
    return request(app)
    .delete('/api/comments/1')
    .expect(204)
    .then(({body}) => {
      const { msg } = body;
      expect(Object.keys(body).length).toBe(0);
    })
  })
  it('should return 400 error when comment_id is invalid', () => {
    return request(app)
    .delete('/api/comments/banana')
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('invalid input')
    })
  })
  it('should return 404 error when no comment exists', () => {
    return request(app)
    .delete('/api/comments/999')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('comment does not exist')
    })
  })
})

describe('GET /api/users', () => {
  it('status 200 - should return all users', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({ body }) => {
      expect(Array.isArray(body.users)).toBe(true)
    })
  })

  it('should return correct types and properties', () => {
    return request(app)
    .get('/api/users')
    .then(({body}) => {
      body.users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String), 
          name: expect.any(String) ,
          avatar_url: expect.any(String) ,
        })
      })
    })
    })
  })

