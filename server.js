const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

server.use(parser.json());
// server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err);
    return
  }
  const db = client.db('egyptians');
  console.log("connected to database");

  server.post('/api/gods', function(req, res){
    const godsCollection = db.collection('gods');
    const godToSave = req.body;
    godsCollection.save(godToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500)
        res.send();
      }
      console.log('saved to database');
      res.status(201);
      res.json(result.ops[0]);
    })
  });

  server.get('/api/gods', function(req, res){
    const godsCollection = db.collection('gods');
    godsCollection.find().toArray(function(err, allGods){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(allGods);
    })
  })

  server.put('/api/gods/:id', function(req, res){
    const godsCollection = db.collection('gods');
    const objectID = ObjectID(req.params.id);
    const filterObject = {_id: objectID};
    const updatedData = req.body;
    godsCollection.update(filterObject, updatedData, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(result);
      res.send();
    });
  })

  server.delete('/api/gods', function(req, res){
    const godsCollection = db.collection('gods');
    godsCollection.deleteMany({}, function(err, allGods){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(allGods);
    })
  })

  server.delete('/api/gods/:id', function(req, res){
    const godsCollection = db.collection('gods');
    const objectID = ObjectID(req.params.id);
    const deleteObject = {_id: objectID};
    godsCollection.deleteOne(deleteObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result);
    })
  })

  server.get('/api/gods/:id', function(req, res){
    const godsCollection = db.collection('gods');
    godsCollection.findOne({}, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result);
    })
  })

  server.listen(3000, function(){
    console.log("Listening on port 3000");
  })
});
