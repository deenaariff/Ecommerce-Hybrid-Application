module.exports = function (server, db, ObjectID) {

  var ObjectId = ObjectID;

  var validateRequest = require("../auth/validateRequest");

  server.get('/api/v1/foodList/data/list', function (req, res) {

    // TODO: Re-add validation request post-testing
    //validateRequest.validate(req, res, db, function () {
          db.collection('foodList').find(function(err,docs) {
              var jsonStr = JSON.stringify(docs);
              console.log("Request Received");
              res.end(jsonStr);
              if (err) {
                res.end(JSON.stringify ({
                    error: "DB Error"
                }));
              }
          });
  });

  server.get('/api/v1/foodList/data/item/:id', function (req, res, next) {

      validateRequest.validate(req, res, db, function () {
          db.foodList.find ({
            _id: db.ObjectID(req.param.id)
          }, function (err, data) {
            res.end(data);
          });
      });

      return next();

  });

  server.post('/api/v1/foodList/data/item', function (req, res) {

    // TODO: Re-add validation request post-testing
    //validateRequest.validate(req, res, db, function () {
        console.log(req.params);
        var item = req.body;
        console.log(req.body);
        db.collection('foodList').save(item,
          function (err, data) {
              res.end(JSON.stringify(data));
          });

      //});

  });

  server.put('/api/v1/foodList/data/item/:id', function (req, res, next) {

      validateRequest.validate(req, res, db, function () {
        db.foodList.findOne({
          _id: db.ObjectId(req.params.id)
        }, function (err, data) {
          // merge
          var updProd = {};

          for (var n in data) {
            updProd[n] = data[n];
          }

          for (var n in req.params) {
            if (n != "id")
              updProd[n] = req.params[n];
          }

          db.foodList.update({
            _id: db.ObjectID(req.params.id)
          }, updProd, {
            multi: false
          }, function (err, data) {
            res.end(JSON.stringify(data));
          });
        });
      });

      return next();

    });

  server.delete('/api/v1/foodList/data/item/:id', function (req, res) {

      //validateRequest.validate(req, res, db, function () {
        db.collection('foodList').remove({
          _id: ObjectId(req.params.id)
        }, function (err, data) {
              res.end(JSON.stringify(data));

              if (err) {
                res.writeHead(403, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(err));
            }
        });
        //});
  });


}
