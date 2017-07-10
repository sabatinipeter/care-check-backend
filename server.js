const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://admin:carecheck@ds151752.mlab.com:51752/carecheck', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  });
});

app.get('/clients', (req, res) => {
  db.collection('clients').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send({clients: result});
  })
});
