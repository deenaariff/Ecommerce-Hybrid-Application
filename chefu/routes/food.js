var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  var db = req.db;
  var users = db.get('foodList');
  users.find( {}, {}, function(e,docs){
    res.send(docs);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  var db = req.db;
  var users = db.get('foodList');
  res.send(users[id]);
});


module.exports = router;