// require packages
var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

// begin goodreadService 
var goodreadService = function() {

	var getBookById = function(id, cb) {
		
		// options set to retrieve using key and in xml format
		var options = {
			host: 'www.goodreads.com',
			path: '/book/show/' + id + '?format=xml&key=OdHoxPeNBeQwK7Ht9tQdQw'
		};

		var callback = function(response) {
			var str = '';
			response.on('data', function(chunk) {
				str += chunk;
			});
			response.on('end', function() {
				console.log(str);
				parser.parseString(str, function(err, result) {
					cb(null, result.GoodreadsResponse.book);
				});
			});
		};
		http.request(options, callback).end();
	};


	return {
		getBookById: getBookById
	};

};

module.exports = goodreadService;