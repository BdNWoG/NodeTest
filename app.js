// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const connectMongo = require('./database'); // Make sure this path matches the location of your database.js file

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Start the server only after connecting to the database
const startServer = async () => {
    try {
        const db = await connectMongo(); // Connect to the MongoDB database

        // Define a route to get all blog posts
        app.get('/posts', async (req, res) => {
            const posts = await db.collection('posts').find({}).toArray();
            res.json(posts);
        });

        // Define a route to get a single blog post by ID
        app.get('/posts/:id', async (req, res) => {
            const { id } = req.params;
            const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
            if (post) {
                res.json(post);
            } else {
                res.status(404).send('Post not found');
            }
        });

        // Define a route to create a new blog post
        app.post('/posts', async (req, res) => {
            const { title, content } = req.body;
            const result = await db.collection('posts').insertOne({ title, content });
            res.status(201).json(result.ops[0]);
        });

        // Define a route to update an existing blog post
        app.put('/posts/:id', async (req, res) => {
            const { id } = req.params;
            const { title, content } = req.body;
            const result = await db.collection('posts').findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { title, content } },
                { returnOriginal: false }
            );
            res.json(result.value);
        });

        // Define a route to delete a blog post
        app.delete('/posts/:id', async (req, res) => {
            const { id } = req.params;
            const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).send('Post not found');
            }
        });

        // Listen on the specified port
        app.listen(port, () => {
            console.log(`Blog app listening at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};

// Call startServer to launch the app
startServer();
