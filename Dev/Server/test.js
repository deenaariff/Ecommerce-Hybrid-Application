var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('./config');

describe('Restful API Testing', function() {
  var url = config.base;
  before(function(done) {
    mongoose.connect(config.db.url);
    done();
  });

  describe('Transaction Restful API', function() {

    var testTransaction  = {
      "item": "spaghetti",
      "price": "5"
    };

    it('01.01: Should Return All Transactions', function(done) {
      request(url)
        .get('/api/v1/transactions/')
    	  .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(200);
          done();
        });
    });
    it('01.02: Create Transaction', function(done) {
      var id = "";
      request(url)
        .post('/api/v1/transactions/addItem')
        .send(JSON.stringify(testTransaction))
    	  .end(function(err, res) {
          if (err) {
            throw err;
          }
          testTransaction = res;
          res.status.should.be.equal(201);
          done();
        });
    });
    it('01.03: Return Transaction by ID', function(done) {
      request(url)
        .get('/api/v1/transactions/' + testTransaction.id.$oid)
    	  .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(200);
          done();
        });
    });
    it('01.04: Delete Transaction By Id', function(done) {
      request(url)
        .delete('/api/v1/transactions/delete/' + + testTransaction.id.$oid)
    	  .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(200);
          done();
        });
    });
  });

  describe('User Restful API', function() {

    var testUser = {
        "id": "test.id",
        "fname": "TestFirstName",
        "lname": "TestLastName",
        "picture": "TestPicture",
        "email": "TestEmail@test.com",
    };

    it('02.01: Should Add User and Return Full User Object', function(done) {
      request(url)
        .post('/api/v1/users/addUser')
        .send(testUser)
    	  .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(201);
          done();
        });
    });
  });


});
