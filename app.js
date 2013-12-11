
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var bookmarksRoute = require('./routes/bookmark');
var http = require('http');
var path = require('path');
var viewhelper = require('./lib/viewhelper');

var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(viewhelper.currentPath);
app.use(app.router);
// development only
if ('development' == app.get('env')) {
  app.use(require('less-middleware')({ src: path.join(__dirname, 'public'), force: true }));
} else {
  app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
}
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);

app.get('/bookmarks', bookmarksRoute.index);
app.get('/bookmarks/new', bookmarksRoute.new);
app.post('/bookmarks', bookmarksRoute.create);


var mongoURI = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoURI);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
