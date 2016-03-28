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
var _ObjectID;
var _dbmodules = require('../other_modules/db_components')

exports.init = function (db, ObjectID) {
  _db = db;
  _ObjectID = ObjectID;
}

/* Add New User*/
exports.addUser = function (req, res) {
    console.log("Add User Request Made (Post)");
    _db.users.find({
      "email": req.param.email
    }, function(err,user) {
        if (err)
          res.status(503).end("Internal Database Error")
        if (user.size === 0) {
          res.status(200).end("User Already Present in Database");
        } else {
          var user = _dbmodules.createUser(req.param);
          _db.users.save(user, function (err, dbUser) {
            if (err) {
                if (err.code == 11000)
                    res.status(503).end("Internal Database Error")
            } else {
              res.status(201).end(JSON.stringify(user));
            }
          });
        }
    });
}

/* Add to Requested Purchases */
exports.addReqPurchase = function (req,res) {
    _db.users.update({email: req.body.email}, {
      $push: {requested_purchases: req.body.fid}}, {multi: true},
      function (err, res) {
        if (err)
          res.status(503).end("Internal Database Error")
        else
          res.status(201).end(req.body.fid);
    })
};

/* Add to Intermediate Purchases */
exports.addPendPurchase = function (req,res) {
  _db.users.update({email: req.body.email}, {
    $push: {pending_purchases: req.body.fid}}, {multi: true}, function () {
      // Remove from requested_purchases
      // Update Food Quantity
    res.end(req.body.fid);
  })
};

/* Delete from Intermediate Purchases */
exports.delPendPurchase = function (req, res) {
  _db.users.update({email: req.body.email}, {
    $push: {pending_purchases: req.body.fid}}, {multi: true}, function () {
      // Remove from requested_purchases
      // Update Food Quantity
    res.end(req.body.fid);
  })
};
