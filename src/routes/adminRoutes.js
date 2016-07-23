// require packages
var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

// books to import
var books = [
	{
		title: 'Outliers',
		genre: 'Non-fiction',
		author: 'Malcomb Gladwell',
		bookId: 3228917,
		read: true
	},
	{
		title: 'Positioning',
		genre: 'Business & Marketing',
		author: 'EB Webb i think',
		bookId: 760025,
		read: true
	},
	{
		title: 'Freakonomics',
		genre: 'Crazy Economist view on the world',
		author: 'Steven Levitt',
		bookId: 1202,
		read: true
	},
	{
		title: 'The Five People You Meet in Heaven',
		genre: 'Fiction',
		author: 'Mitch Albom',
		bookId: 3431,
		read: true
	},
	{
		title: 'Predictably Irrational',
		genre: 'Non-fiction Creative Thinking',
		author: 'Dan Ariely',
		bookId: 1713426,
		read: true
	},
	{
		title: 'Blink',
		genre: 'Non-fiction',
		author: 'Malcomb Gladwell',
		bookId: 40102,
		read: true
	}
];

// inserts books into collection, use remove and then re add all books to rid duplicates
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
