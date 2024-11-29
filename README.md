# NC News API

**Overview**

The NC News API is a backend server application designed for a news aggregation and discussion platform. Similar to Reddit's functionality, this API provides comprehensive endpoints for managing articles, topics, comments, and user interactions.

**Key Features**

* Retrieve and manipulate articles
* Post and manage comments
* Vote on articles and comments
* User-friendly endpoints for seamless data interaction

## Getting Started

**Prerequisites**
* Node.js (v20.0.0+)
* PostgreSQL (v14.0+)


**Installation**
1. Clone the repository:
`git clone https://github.com/swamphobbit22/my-nc-news.git`

2. Navigate to the project directory:
`cd my-nc-news`

3. Install dependencies:
`npm install`

## Database Setup 
1. Create the `.env.development` file:
`PGDATABASE=nc_news`

2. Set up the local Database:
`npm run setup-dbs`

## Running the Application
Start the server:
`npm start`

## Configuring Environment Variables

Create two environment variable files in the project root:

* `.env.development` - For the development database
* `.env.test` - For the test database

Example format:


    .env.development
    Database_name=nc_news_dev
    .env.test
    Database_name=nc_news_test


## Dependencies

The following dependencies are used:

    dotenv: ^16.4.5,
    express: ^4.21.1,
    pg: ^8.13.1",
    supertest: ^7.0.0,
    pg-format: ^1.0.4

For a complete list see the package.json file.

**Please see the API documention for endpoint information**

**Link to the live api here**
https://my-nc-news-web-service.onrender.com/

