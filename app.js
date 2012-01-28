
/**
 * Module dependencies.
 */
var express = require('express');
var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);


// Configuration

// Database
var db = require('mongoose');
db.connect('mongodb://localhost/tetris');
Schema = db.Schema,
ObjectId = Schema.ObjectId;

// Models

var models = require('./models/models').init(db);
var player = require('./models/player');
var game = require('./models/game');

// app
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Setup default objets (admin)
player.install();	


// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Node Tetris'
  });
});

io.sockets.on('connection', function (socket) {

  socket.on('init_game', function (data) {
			game.init( function(result) {
					socket.emit('init_game', { parameters: result });
			});			
  });

});

// User

// app.all('/users', user.list);
// app.get('/users/new', user.edit);
// app.get('/users/:id', user.view);
// app.get('/users/:id/edit', user.edit);
// app.post('/users/save', user.update);
// app.get('/users/:id/delete', user.delete);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
