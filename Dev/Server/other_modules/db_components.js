// Author: Deen Aariff
// Date: Thur March 24, 2016
// Description: Helper Functions for Various Modules
// Dependendencies: N/A


exports.createTransaction = function (param) {
  return new Promise(function(resolve, reject) {
    resolve({
          "transaction": param.transaction,
          "price": param.price,
          "picture": param.picture,
          "quantity":  param.quantity,
          "seller": {
            "fname": "",
            "lname": ""
          }
    });
  });
};

exports.createUser = function (param, user) {
  return new Promise(function(resolve) {
    resolve({
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
    });
  });
};
