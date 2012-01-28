/* Taille du cube de base de toutes les shape */
var CUBE_SIZE = 30;
/* Couleurs des formes */
var formColor = new Array("#00ff00","#00ff00","#ff0000","#ff8000","#0000ff","#ff00ff","#00fdff","#ffff00");
/** Taille du plan en pixel */
var PLAYGROUND_HEIGHT = 600;
var PLAYGROUND_WIDTH = 300;
var PLAYGROUND_IMAGE = "/images/background.png"; // ajout d'une image sur le fond 

var speed = 2;

var fillStyle = "#194580";
var strokeStyle = "#194681";

// la surface du jeu
var TX=10;
var TY=20;

exports.init = function(callback){
	var parameters = {'fillStyle':fillStyle, 
										'strokeStyle':strokeStyle, 
										'playgroundWidth':PLAYGROUND_WIDTH, 
										'playgroundHeight':PLAYGROUND_HEIGHT, 
										'cubeSize':CUBE_SIZE,
										'formColor': {'0':formColor[0],
																	'1':formColor[1],
																	'2':formColor[2],
																	'3':formColor[3],
																	'4':formColor[4],
																	'5':formColor[5],
																	'6':formColor[6],
																	'7':formColor[7]},
										'playgroundImage':PLAYGROUND_IMAGE,
										'speed':speed,
										'tx':TX,
										'ty':TY};										
	callback(parameters);
	return;
};

