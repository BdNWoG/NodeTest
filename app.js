const express = require('express');
const bodyParser = require('body-parser');
const connectMongo = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const startServer = async () => {
  try {
    const db = await connectMongo();

    // Get all posts
    app.get('/posts', async (req, res) => {
      try {
        const posts = await db.collection('posts').find({}).toArray();
        res.json(posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Error fetching posts');
      }
    });

    // Additional routes (POST, PUT, DELETE) would be similarly defined here...

    app.listen(port, () => {
      console.log(`Blog app listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
