let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

const DB_USER = process.env.MONGO_DB_USERNAME
const DB_PASS = process.env.MONGO_DB_PWD

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

// when starting app locally, use "mongodb://admin:password@localhost:27017" URL instead
let mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// the following db and collection will be created on first connect
let databaseName = "my-db";
let collectionName = "my-collection";

app.get('/fetch-data', function (req, res) {
  let response = {};
  MongoClient.connect(mongoUrlDockerCompose, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { myid: 1 };

    db.collection(collectionName).findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

