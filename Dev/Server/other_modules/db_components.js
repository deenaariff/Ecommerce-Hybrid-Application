// Author: Deen Aariff
// Date: Thur March 24, 2016
// Description: Helper Functions for Various Modules
// Dependendencies: N/A

module.exports = function (db) {

  // function to create new user object
  var createUser = function (param, callback) {
    var user = {
        "id": param.id,
        "fname": param.fname,
        "lname": param.lname,
        "picture": param.picture,
        "email": param.email,
        "s_stars": 0,
        "reviews": [],
        "requested_purchases": [],
        "pending_purchases": [],
        "completed_purchases": [],
        "pending_sales": [],
        "completed_sales" : []
    }
    db.users.insert(user, function (err, dbUser) {
      if (err) {
          if (err.code == 11000)
              res.writeHead(400,{
                  'Content-Type': 'application/json; charset=utf-8'
              });
      } else {
          return(JSON.stringify(user));
      }
    });
  }

}
