// Author: Deen Aariff
// Date: Thur March 24, 2016
// Description: transactions API Callback Functions
// Dependendencies: /auth/validateREquest

var init = false;
var validateRequest = require("../auth/validateRequest");
var _db;
var _ObjectId;

exports.init = function (db, ObjectId) {
  _db = db;
  _ObjectId = ObjectId;
  init = true;
}

exports.getAllTransactions = function (req, res) {
    console.log("HTTP Get Request: /api/v1/transactions/")
    _db.collection('transactionsList').find(function(err,docs) {
        if (err) {
          console.log(err);
          if(res) res.status(503).end(JSON.stringify(err))
        }
        if(res) res.status(200).end(JSON.stringify(docs));
    });
};

exports.addTransactionsItem = function  (req, res) {
    console.log("HTTP Post Request: /api/v1/transactions/addItem")
    var item = req.body;
    _db.collection('transactionsList').save(item,
      function (err, data) {
        if (err) {
          console.log(err);
          if(res) res.status(503).end(JSON.stringify(err))
        }
        if(res) res.status(201).end(JSON.stringify(data));
    });
};

exports.getTransactionsItem = function (req, res) {
    console.log("HTTP Get Request: /api/v1/transactions/:id")
    _db.collection('transactionsList').findOne ({
      $oid: _ObjectId(req.param.id)
    }, function (err, data) {
      if (err) {
        console.log(err);
        if(res) res.status(503).end(JSON.stringify(err))
      }
      if(res) res.status(200).end(JSON.stringify(data));
    });
};


exports.updateTransactionsItem = function (req, res, next) {
  console.log("HTTP Put Request: /api/v1/transactions/update/:id")
    _db.transactionsList.findOne({
      $oid: _db._ObjectId(req.params.id)
    }, function (err, data) {
      var updProd = {};
      for (var n in data) {
        updProd[n] = data[n];
      }
      for (var n in req.params) {
        if (n != "id")
          updProd[n] = req.params[n];
      }
      _db.transactionsList.update({
        _id: _db._ObjectId(req.params.id)
      }, updProd, {
        multi: false
      }, function (err, data) {
        if(res) res.status(201).end(JSON.stringify(data));
      });
    });
  return next();
};

exports.deleteTransactionsItem = function (req, res) {
  console.log("HTTP Delete Request: /api/v1/transactions/delete/:id")
    _db.collection('transactionsList').remove({
      $oid: _ObjectId(req.body.id)
    }, function (err, data) {
      if (err) {
        console.log(err);
        if(res) res.status(503).end(JSON.stringify(err))
      }
      if(res) res.status(200).end(JSON.stringify(data));
    });
};

exports.updateQuantity = function (req, res) {
}
