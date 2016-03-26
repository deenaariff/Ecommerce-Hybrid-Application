// Author: Deen Aariff
// Date: Thur March 24, 2016
// Description: Food API Callback Functions
// Dependendencies: /auth/validateREquest

var validateRequest = require("../auth/validateRequest");
var _db;
var _ObjectId;

exports.init = function (db, ObjectId) {
  _db = db;
  _ObjectId = ObjectId;
}

exports.getAllFood = function (req, res) {
    _db.collection('foodList').find(function(err,docs) {
        var jsonStr = JSON.stringify(docs);
        console.log("Get All Food Request Made (Get)")
        res.end(jsonStr);
        if (err) {
          res.end(JSON.stringify ({
              error: "DB Error"
          }));
        }
    });
};

exports.getFoodItem = function (req, res, next) {
  //validateRequest.validate(req, res, db, function () {
      _db.collection('foodList').findOne ({
        _id: _db._ObjectId(req.param.id)
      }, function (err, data) {
        res.end(data);
      });
  return next();
};

exports.addFoodItem = function  (req, res) {
  //validateRequest.validate(req, res, db, function () {
    console.log(req.params);
    var item = req.body;
    console.log(req.body);
    _db.collection('foodList').save(item,
      function (err, data) {
          res.end(JSON.stringify(data));
      });
};

exports.updateFoodItem = function (req, res, next) {
  //validateRequest.validate(req, res, db, function () {
    _db.foodList.findOne({
      _id: _db._ObjectId(req.params.id)
    }, function (err, data) {
      var updProd = {};
      for (var n in data) {
        updProd[n] = data[n];
      }
      for (var n in req.params) {
        if (n != "id")
          updProd[n] = req.params[n];
      }
      _db.foodList.update({
        _id: _db._ObjectId(req.params.id)
      }, updProd, {
        multi: false
      }, function (err, data) {
        res.end(JSON.stringify(data));
      });
    });
  return next();
};

exports.deleteFoodItem = function (req, res) {
  //validateRequest.validate(req, res, db, function () {
    _db.collection('foodList').remove({
      _id: _ObjectId(req.params.id)
    }, function (err, data) {
          res.end(JSON.stringify(data));

          if (err) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(err));
        }
    });
};
