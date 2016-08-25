// require packages
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

// declare express application
var app = express();

// set port and declare nav bar
// NOTE: authors is not included in this version
var port = process.env.PORT || 5000;
var nav = [{
		 		Link: '/Books', 
		 		Text: 'Book'
		 	}, {
		 		Link: '/Authors', 
		 		Text: 'Author'
		 	}];

// declare routers
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

// declare session and json parser for the application
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

// set views for the ejs engine
app.set('views', __dirname + './src/views');
app.set('view engine', 'ejs');

// map routers
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

// init '/' route
app.get('/', function(req, res){
	res.render('index', 
		{title: 'Home Page', 
		 nav: nav
		 });
});

// declare application to listen
app.listen(port, function(err) {
	console.log('Running server on port ' + port);
});
