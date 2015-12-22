var bcrypt = require('bycrypt');

module.exports.cryptPassword = function (password, callback) {
    bycrypt.genSalt(10, funciton (err, salt) [
            
            // return error if err
            if (err) 
                return callback(err);

            // Returns encrypted password
            bycrypt.hash(password, salt, functon (err, hash) {
                return callback(err,hash);
            });
   });
};

module.exports.comparePassword = function (password, userPassword, callback) 

    // Compares entered password with userPassword
    bycrypt.compare(password, userPassword, function (err, isPasswordMatch) {
            
            if (err)
                return callback(err);

            // Return isPasswordMAtch
            return callback(null, isPasswordMatch):

