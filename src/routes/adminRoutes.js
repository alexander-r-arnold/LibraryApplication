var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
	{
		title: 'Outliers',
		genre: 'Non-fiction',
		author: 'Malcomb Gladwell',
		bookId: 3228917,
		read: true
	},
	{
		title: 'Charolettes Web',
		genre: 'Childrens Novel',
		author: 'EB Webb i think',
		bookId: 24178,
		read: true
	},
	{
		title: 'Freakonomics',
		genre: 'Crazy Economist view on the world',
		author: 'Steven Levitt',
		read: true
	},
	{
		title: 'The Intelligent Investor',
		genre: 'Finance',
		author: 'Bejamin Ghramam',
		read: false
	},
	{
		title: 'Predictably Irreational',
		genre: 'Non-fiction Creative Thinking',
		author: 'Some guy',
		read: false
	},
	{
		title: 'Blink',
		genre: 'Non-fiction',
		author: 'Malcomb Gladwell',
		read: false
	}
];

var router = function(nav){

	adminRouter.route('/addBooks')
		.get(function(req, res) {
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function(err, db) {
				var collection = db.collection('books');
				collection.insertMany(books, function(err, results) {
					res.send(results);
					db.close();
				});
			});
			//res.send('inserting books');
		});



	return adminRouter;
};

module.exports = router;
