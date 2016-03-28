// Author: Deen Aariff
// Date: Tues March 22, 2016
// Description: Main Server
// Dependendencies: Express, Cors, Body-Parser, MongoDB, Multer, MongoJs, Morgan

var express = require('express');
var server = express();

// Server Dependencies
var dep = {
	path: require('path'),
	cors: require('cors'),
	bodyParser: require('body-parser'),
	mongodb: require("mongodb"),
	multer: require('multer'),
	mongojs: require('mongojs'),
	morgan: require('morgan'),
	config: require('./config')
}

// Database Instantiation with MongoJs
var db = dep.mongojs(dep.config.db.url,dep.config.db.collections)

// Server Configuration
function configureServer () {
	server.use(dep.bodyParser.urlencoded({ extended: true }))
	server.use(dep.bodyParser.json())
	server.use(dep.cors());
};

// Callback Functions to Handle API Requests
var handlers = {
	transactions: require('./Handlers/transactionsHandler'),
	users: require('./Handlers/userHandler'),
	buyer: require('./Handlers/buyerHandler')
}

// Contains API Requests for transactions and Users
var routes = require('./Routes/routes');

// Initialize API's
function initAPIS() {
	routes.init(server,handlers);
	handlers.transactions.init(db, dep.mongodb.ObjectId);
	handlers.users.init(db, dep.mongodb.ObjectId);
	handlers.buyer.init(db, dep.mongodb.ObjectId);
	routes.transactionsSetup();
	routes.userSetup();
	routes.buyerSetup();
}

// Server Start Function
function start () {
	console.log("Running Server Configurations...")
	configureServer();
	console.log("Initializing API'...")
	initAPIS();
	var port = process.env.PORT || dep.config.port;
	server.listen(port);
  console.log("Server listening on port %d", port);
}

start();
