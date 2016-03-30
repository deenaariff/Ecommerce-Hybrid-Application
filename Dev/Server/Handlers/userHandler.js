/******************************************************

// Author: Deen Aariff
// Date: Thur March 24, 2016
// Description: User _db APi's
// Dependendencies: /other_modules/_db_components

*******************************************************/

var _db;
var _dbmodules = require('../other_modules/db_components')
var _ObjectId;

exports.init = function (db, ObjectID) {
  _db = db;
  _ObjectId = ObjectID;
}

/* Add New User*/
exports.addUser = function (req, res) {
    console.log("HTTP Post Request: '/api/v1/users/addUser'");
    _db.users.findOne({
      email: req.body.email
    }, function(err,dbres) {
        if (err)
          if(res) res.status(503).end(JSON.stringify(err))
        if (dbres) {
          if(res) res.status(200).end("User Already Present in Database");
        }
        else {
          var promise = _dbmodules.createUser(req.body);
          promise.then(function(user) {
             _db.users.save(user, function (err, user) {
                if (err) {
                  console.log(err);
                  if(res) res.status(503).end(JSON.stringify(err))
                } else
                  if(res) res.status(201).end(JSON.stringify(user));
              });
          });
       };
    })
};

/* Check if User Exists */
function doesUserExist (req, res) {
  _db.users.findOne({
    email: req.body.email
  }, function(err,dbres) {
      if (err)
        if(res) res.status(503).end(JSON.stringify(err))
      if (dbres)
        if(res) res.status(400).end("User Exists");
      else
        if(res) res.status(401).end("User Doesn't Exist")
  });
}

/* Delete User */
exports.deleteUser = function (req, res) {
  _db.users.delete({
    email: req.body.email
  }, function(err,dbres) {
      if (err)
        if(res) res.status(503).end(JSON.stringify(err))
      if (dbres)
        if(res) res.status(400).end("User Exists");
      else
        if(res) res.status(401).end("User Doesn't Exist")
  });
}
