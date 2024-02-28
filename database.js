const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'blogApp';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db(dbName);
  console.log(`Connected MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);
});

const getDb = () => db;

module.exports = { getDb };