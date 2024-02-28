// Import the MongoClient from the MongoDB driver
const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'blogApp';

// Async function to connect to the MongoDB and return the database connection
async function connectMongo() {
    const client = await MongoClient.connect(url);
    console.log('Connected successfully to MongoDB');
    return client.db(dbName);
}

// Export the connectMongo function for use in other files
module.exports = connectMongo;
