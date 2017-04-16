/** Shapes */
let ZF = [[ [0,1,0,0], [0,1,1,0], [0,0,1,0], [0,0,0,0] ],
          [ [0,0,0,0], [0,1,1,0], [1,1,0,0], [0,0,0,0] ],
          [ [0,1,0,0], [0,1,1,0], [0,0,1,0], [0,0,0,0] ],
          [ [0,0,0,0], [0,1,1,0], [1,1,0,0], [0,0,0,0] ]];

let SF = [[ [0,0,2,0], [0,2,2,0], [0,2,0,0], [0,0,0,0] ],
          [ [0,0,0,0], [2,2,0,0], [0,2,2,0], [0,0,0,0] ],
          [ [0,0,2,0], [0,2,2,0], [0,2,0,0], [0,0,0,0] ],
          [ [0,0,0,0], [2,2,0,0], [0,2,2,0], [0,0,0,0] ]];

let JF = [[ [0,3,0,0], [0,3,0,0], [0,3,3,0], [0,0,0,0] ],
          [ [0,0,0,0], [0,3,3,3], [0,3,0,0], [0,0,0,0] ],
          [ [0,0,0,0], [0,3,3,0], [0,0,3,0], [0,0,3,0] ],
          [ [0,0,0,0], [0,0,3,0], [3,3,3,0], [0,0,0,0] ]];

let LF = [[ [0,0,0,0], [0,4,4,0], [0,4,0,0], [0,4,0,0] ],
          [ [0,0,0,0], [4,4,4,0], [0,0,4,0], [0,0,0,0] ],
          [ [0,0,4,0], [0,0,4,0], [0,4,4,0], [0,0,0,0] ],
          [ [0,0,0,0], [0,4,0,0], [0,4,4,4], [0,0,0,0] ]];

let TF = [[ [0,5,0,0], [0,5,5,0], [0,5,0,0], [0,0,0,0] ],
          [ [0,0,0,0], [5,5,5,0], [0,5,0,0], [0,0,0,0] ],
          [ [0,5,0,0], [5,5,0,0], [0,5,0,0], [0,0,0,0] ],
          [ [0,5,0,0], [5,5,5,0], [0,0,0,0], [0,0,0,0] ]];

let IF = [[ [0,0,6,0], [0,0,6,0], [0,0,6,0], [0,0,6,0] ],
          [ [0,0,0,0], [0,0,0,0], [6,6,6,6], [0,0,0,0] ],
          [ [0,0,6,0], [0,0,6,0], [0,0,6,0], [0,0,6,0] ],
          [ [0,0,0,0], [0,0,0,0], [6,6,6,6], [0,0,0,0] ]];

let OF = [[ [0,7,7,0], [0,7,7,0], [0,0,0,0], [0,0,0,0] ],
          [ [0,7,7,0], [0,7,7,0], [0,0,0,0], [0,0,0,0] ],
          [ [0,7,7,0], [0,7,7,0], [0,0,0,0], [0,0,0,0] ],
          [ [0,7,7,0], [0,7,7,0], [0,0,0,0], [0,0,0,0] ]];

/* Taille du cube de base de toutes les shape */
let CUBE_SIZE = 30;
/* Couleurs des formes */
let formColor = new Array("#00ff00","#00ff00","#ff0000","#ff8000","#0000ff","#ff00ff","#00fdff","#ffff00");
/** Taille du plan en pixel */
let PLAYGROUND_HEIGHT = 600;
let PLAYGROUND_WIDTH = 300;
let PLAYGROUND_IMAGE = "/images/background.png"; // ajout d'une image sur le fond 
let speed = 2;
let fillStyle = "#194580";
let strokeStyle = "#194681";

// la surface du jeu
let TX=10;
let TY=20;

exports.init = function(callback){
	let parameters = {
		'fillStyle':fillStyle, 
		'strokeStyle':strokeStyle, 
		'playgroundWidth':PLAYGROUND_WIDTH, 
		'playgroundHeight':PLAYGROUND_HEIGHT, 
		'cubeSize':CUBE_SIZE,
		'formColor': {
			'0':formColor[0],
			'1':formColor[1],
			'2':formColor[2],
			'3':formColor[3],
			'4':formColor[4],
			'5':formColor[5],
			'6':formColor[6],
			'7':formColor[7]
		},
		'playgroundImage':PLAYGROUND_IMAGE,
		'speed':speed,
		'tx': TX,
		'ty': TY,
		'OF': OF,
		'IF': IF,
		'TF': TF,
		'LF': LF,
		'JF': JF,
		'SF': SF,
		'ZF': ZF
	};
	callback(parameters);
	return;
};


