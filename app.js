const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const { getDb } = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all posts
app.get('/posts', async (req, res) => {
  const db = getDb();
  const posts = await db.collection('posts').find({}).toArray();
  res.json(posts);
});

// Get a single post
app.get('/posts/:id', async (req, res) => {
  const db = getDb();
  const post = await db.collection('posts').findOne({ _id: new ObjectId(req.params.id) });
  res.json(post);
});

// Create a new post
app.post('/posts', async (req, res) => {
  const db = getDb();
  const post = { title: req.body.title, content: req.body.content };
  const result = await db.collection('posts').insertOne(post);
  res.json(result.ops[0]);
});

// Update a post
app.put('/posts/:id', async (req, res) => {
  const db = getDb();
  const result = await db.collection('posts').findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: { title: req.body.title, content: req.body.content } },
    { returnOriginal: false }
  );
  res.json(result.value);
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
  const db = getDb();
  const result = await db.collection('posts').deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 1) {
    res.json({ message: "Post deleted successfully." });
  } else {
    res.json({ message: "Post not found." });
  }
});

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});
