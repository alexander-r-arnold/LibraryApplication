// require packages
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bookRouter = express.Router();

// handles /books and /books/<id>
var router = function(nav){
	var bookService = require('../services/goodreadsService')();
	var bookController = require('../controllers/bookController')(bookService, nav);

	bookRouter.use(bookController.middleware);
	bookRouter.route('/')
		.get(bookController.getIndex);

	bookRouter.route('/:id')
	.get(bookController.getById);


	return bookRouter;
};

module.exports = router;
