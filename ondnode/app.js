
/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./config/mysql');

var app = express();
var router = express.Router();
// Set all environments
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
global.__base = __dirname + '/';

app.use('/api', require('./controllers'));

connection.init();

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
});

function logger(req,res,next){
  console.log(new Date(), req.method, req.url);
  next();
}
