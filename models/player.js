// Player 

var models = require('./models');
var Player = models.Player;


exports.list = function(){
	Player.find({}, function(err, found) {
	    for(var i=0;i<found;i++){
	      console.log("player:"+found[i].username);	      
	    }
  		return { players: found };
	});
};