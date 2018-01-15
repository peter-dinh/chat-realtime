const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'appchat';


// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  createCapped(db, function(){
    client.close();
  });
});

function createCapped(db, callback){
    db.createCollection("abc", {"capped": true, "size": 100000, "max": 5000}, 
    function(err, results){
      if (err)
      {
        throw err;
      }
        console.log("Collection created!");
        callback();
    });
};


