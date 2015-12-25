module.exports = function (server, db) {

  var validateRequest = require("../auth/validateRequest");

  server.get("/api/v1/foodList/data/list", function (req, res, next) {

    // TODO: Re-add validation request post-testing
    //validateRequest.validate(req, res, db, function () {
        db.collection('foodList').find(function(err,docs) {
            var jsonStr = JSON.stringify(docs);
            res.send(jsonStr);
          })
        /*

        db.collection('foodList').find({
          price: req.param.token
        }, function (err, list) {
          if (err) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify ({
                error: "DB Error"
            }));
          }
          res.writeHead(200,  {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(list));
        });

      */

    //});

      return next();

  });

  server.get('/api/v1/foodList/data/item/:id', function (req, res, next) {

      validateRequest.validate(req, res, db, function () {
          db.foodList.find ({
            _id: db.ObjectID(req.param.id)
          }, function (err, data) {
            res.writeHead(200,  {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
          });
      });

      return next();

  });

  server.post('/api/v1/foodList/data/item', function (req, rest, next) {

    // TODO: Re-add validation request post-testing
    // validateRequest.validate(req, res, db, function () {
        var item = req.params;
        db.foodList.save(item,
          function (err, data) {
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
          });
      });

      return next();

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
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
          });
        });
      });

      return next();

  });

  server.del('/api/v1/foodList/data/item/:id', function (req, res, next) {

      validateRequest.validate(req, res, db, function () {
        db.foodList.remove({
          _id: db.ObjectID(req.params.id)
        }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
        });

        return next();
      });

  });


}
