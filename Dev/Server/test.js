var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('./config');

describe('API Tests', function() {
  var url = config.base;
  /
  before(function(done) {
    mongoose.connect(config.db.url);
    done();
  });

  describe('UserAPI', function() {

    it('Should Add User and Return Full User Object', function(done) {
      var user = {
          "id": "test.id",
          "fname": "TestFirstName",
          "lname": "TestLastName",
          "picture": "TestPicture",
          "email": "TestEmail@test.com",
      };
      request(url)
        .post('/api/v1/users/signIn')
        .send(user);
        // end handles the response
    	  .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(400);
          done();
        });
    });

    it('should correctly update an existing account', function(done){

    	var body = {
    		firstName: 'JP',
    		lastName: 'Berd'
    	};

    	request(url)
    		.put('/api/profiles/vgheri')
    		.send(body)
    		.expect('Content-Type', /json/)
    		.expect(200) //Status code
    		.end(function(err,res) {
    			if (err) {
    				throw err;
    			}
    			// Should.js fluent syntax applied
    			res.body.should.have.property('_id');
                res.body.firstName.should.equal('JP');
                res.body.lastName.should.equal('Berd');
                res.body.creationDate.should.not.equal(null);
    			done();
    		});
    });
  });
});
