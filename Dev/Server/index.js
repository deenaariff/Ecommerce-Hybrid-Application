
// Dependencies

var express = require('express');
var app = express();
var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan      =   require('morgan');
var db          =   mongojs('startupxyz', ['users','foodLists']);
var server      =   restify.createServer();
//var manageUsers = require('./auth/manageUser')(server, db);
var manageFood = require('./productAPIS/foodList')(server,db);

/* ----------------- TESTS -------------------- */

server.get(/.*/, restify.serveStatic({
	'directory': './tests/test1/',
	'default': '/templates/index.html'
}));

/*-------------------------------------------- */

// Restify Parsers
// Interprets REST requests and parses
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER


server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


server.listen(process.env.PORT || 5000, function () {
    console.log("Server started @ ", process.env.PORT || 5000);
});
