var express 	 = require('express'),
	app			 = express(),
	path		 = require('path'),
	multer		 = require('multer'),
	morgan		 = require('morgan'),
	// tinyMce		 = require('angular-ui-tinymce'),
	bodyParser   = require('body-parser'),
	cookieParser = require('cookie-parser'),
	server 		 = require('http').Server(app),
	port 		 = process.env.PORT || 3000;
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'app')));
app.use(morgan('dev'));
app.use(cookieParser());
// using the new view folder
app.set('views', path.join(__dirname +'/app/views'));
app.set('view engine', 'pug');

// express cors
/*app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
   	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});
*/
// using bodyparser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// using the routes
app.use(require('./app/routes/routes.js'));

// app.get('/detail/:id', function(req, res) {
//   	var page =  fs.readFile(__dirname + '/app/views/home/news/detail.pug', 'utf8', function(err, text){
//     res.end(page);
// 	});
// });
server.listen(port , function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Listen port on " + port);
	}
});
