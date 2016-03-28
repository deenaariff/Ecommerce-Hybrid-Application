/******************************************************

// Author: Deen Aariff
// Date: Thur March 24, 2016
// Description: User _db APi's
// Dependendencies: /other_modules/_db_components

*******************************************************/

var _db;
var _dbmodules = require('../other_modules/db_components')

exports.init = function (db, ObjectID) {
  _db = db;
}

/* Add New User*/
exports.addUser = function (req, res) {
    console.log("HTTP Post Request: '/api/v1/users/addUser'");
    _db.users.findOne({
      "email": req.body.email
    }, function(err,dbres) {
        if (err) {
          console.log(err);
          if(res) res.status(503).end(JSON.stringify(err))
        }
        if (dbres) {
          if(res) res.status(200).end("User Already Present in Database");
        }
        else {
          var promise = new Promise(_dbmodules.createUser(req.body));
          promise.resolve(function(user) {
             _db.users.save(user, function (err, user) {
                if (err) {
                  console.log(err);
                  if(res) res.status(503).end(JSON.stringify(err))
                } else
                  if(res) res.status(201).end(JSON.stringify(user));
              });
         });
       };
     });
};
