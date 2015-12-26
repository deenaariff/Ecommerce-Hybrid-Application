
// Dependencies
var express = require('express');
//var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan      =   require('morgan');
var db          =   mongojs('startupxyz', ['users','foodLists']);
//var server      =   restify.createServer();
var server = express();
server.use(express.static('tests/test1'));
//var manageUsers = require('./auth/manageUser')(server, db);
var manageFood = require('./productAPIS/foodList')(server,db);
var bodyParser = require('body-parser')
//
var path = require('path');


// Restify Parsers
// Interprets REST requests and parses
//server.use(restify.acceptParser(server.acceptable));
//server.use(restify.queryParser());
//server.use(restify.bodyParser());
//server.use(morgan('dev')); // LOGGER

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/* ----------------- SERVE TEST TEMPLATES -------------------- */



server.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/tests/test1/home.html'));
});

/*------------------------------------------------------------- */

server.listen(process.env.PORT || 5000, function () {
    console.log("Server started @ ", process.env.PORT || 5000);
});
