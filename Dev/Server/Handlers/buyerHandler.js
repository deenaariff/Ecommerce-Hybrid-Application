var init = false;
var _db;
var _ObjectId;

exports.init = function (db, ObjectID) {
  _db = db;
  _ObjectId = ObjectID;
  init = true;
}

/* Add to Requested Purchases */
exports.addRequest = function (req,res) {
    _db.users.update({email: req.body.email}, {
      $push: {requested_purchases: req.body.fid}}, {multi: true},
      function (err, res) {
        if (err)
          if(res) res.status(503).end("Internal Database Error")
        else
          if(res) res.status(201).end(req.body.fid);
    })
};

/* Add to Pending Purchases */
exports.addPending = function (req) {
  _db.users.update({email: req.body.email}, {
    $push: {pending_purchases: req.body.fid}}, {multi: true}, function () {
      // Remove from requested_purchases
      // Update Food Quantity
  })
};

/* Delete from Intermediate Purchases */
exports.removePending = function (req, res) {
  _db.users.update({email: req.body.email}, {
    $push: {pending_purchases: req.body.fid}}, {multi: true}, function () {
      // Remove from requested_purchases
      // Update Food Quantity
    if(res) res.end(req.body.fid);
  })
};

exports.completeTransaction = function (req, res) {
  var buyer = { "email": req.buyer.email, "fid": req.fid};
  var seller = { "id": req.seller, "fid": req.fid};
  //_venmo.Transaction()
  exports.delPendPurchase(buyer);
};
