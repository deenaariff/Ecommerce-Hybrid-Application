/******************************************************

// Author: Deen Aariff
// Date: Thur March 24, 2016
// Description: User _db APi's
// Dependendencies: /other_modules/_db_components

USER API FUNCTIONALITY
  1. Add new USER - ('/api/v1/users/signIn') (user_email)
  2. Add USER requested purchase
  2. Update USER pending purchases
    - Removes from pending purchases and adds to intermediate stage
    - Update food Quantity
  4. Finalize Purchase
  5.

*******************************************************/

var _db;
var _dbmodules = require('../other_modules/db_components')

exports.init = function (db, ObjectID) {
  _db = db;
}

/* Add New User*/
exports.addUser = function (req, res) {
    console.log("Add User Request Initiated (Post)");
    _db.users.find({
      "email": req.param.email
    }, function(err,user) {
        if (err)
          console.log(err);
          if(res) res.status(503).end(JSON.stringify(err))
        if (user.size != 0) {
          if(res) res.status(200).end("User Already Present in Database");
        } else {
          var user;
          _dbmodules.createUser(req.param, user, _db.users.save(user, function (err, user) {
            if (err) {
              console.log(err);
              if(res) res.status(503).end(JSON.stringify(err))
            } else {
              if(res) res.status(201).end(JSON.stringify(user));
            }
          }));
        }
    });
}
