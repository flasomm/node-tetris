// Player 

var models = require('./models');
var Player = models.Player;


exports.list = function(callback){
	console.log("player list");	
	
	Player.find({}, function(err, docs) {
			//console.log("docs:"+docs);			
	    for(var i=0;i<docs;i++){
	      console.log("player:"+docs[i].username);	      
	    }
			callback(docs);
	});
};

// add default value for player
exports.install = function(){

	console.log("player install");
	var player = new Player({
	  username: 'flasomm',
	  email: 'flasomm@gmail.com',
	  firstname: 'Fabrice',
	  lastname: 'Sommavilla',
	  birthdate: new Date(1974, 4, 24)
	});

	Player.findOne({ email: 'flasomm@gmail.com'}, function (error, post) {
	  if (!post) {
			player.save(function (err) {
		    if(err) {
		      console.log(err);
		      next(err);
		    } else {			
		      console.log("Player module installed ... ");
		    }
			});	
	  }
	});	
	
}

