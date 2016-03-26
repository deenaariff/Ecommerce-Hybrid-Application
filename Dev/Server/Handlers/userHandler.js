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
var _dbmodules = require('../other_modules/db_components')(_db);

exports.init = function (db, ObjectID) {
  _db = db;
  _ObjectID = ObjectID;
}

/* Add New User*/
exports.addUser = function (req, res) {
    console.log("Add User Request Made (Post)");
    _db.users.find({
      "email": _db._ObjectID(req.param.email)
    }, function(err,user) {
        if (user) {
          if (err) { res.end(JSON.stringify ({error: "_db Error"}));}
          res.end(JSON.stringify(user));
        } else {
          res.end(_dbmodules.createUser(req.param)); // creates user and adds to databse
        }
    });
}

/* Add to Requested Purchases */
exports.addReqPurchase = function (req,res) {
    _db.users.update({email: req.body.email}, {
      $push: {requested_purchases: req.body.fid}}, {multi: true}, function () {
      res.end(req.body.fid);
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
  _db.users.remove({email: req.body.email}, {
    $push: {pending_purchases: req.body.fid}}, {multi: true}, function () {
      // Remove from requested_purchases
      // Update Food Quantity
    res.end(req.body.fid);
  })
};
