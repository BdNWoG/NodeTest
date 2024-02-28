const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'blogApp';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    return;
  }
  db = client.db(dbName);
  console.log(`Connected MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);
});

const getDb = () => db;

module.exports = { getDb };
