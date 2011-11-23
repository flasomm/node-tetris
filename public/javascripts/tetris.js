function tetris() {
  
  /** Formes en matrice */
  var ZF = [
            [
              [0,1,0,0],
              [0,1,1,0],
              [0,0,1,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [0,1,1,0],
              [1,1,0,0],
              [0,0,0,0]
            ],
            [
              [0,1,0,0], 
              [0,1,1,0],
              [0,0,1,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [0,1,1,0],
              [1,1,0,0],
              [0,0,0,0]
            ]
  ];

  var SF = [
            [
              [0,0,2,0], 
              [0,2,2,0],
              [0,2,0,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [2,2,0,0],
              [0,2,2,0],
              [0,0,0,0]
            ],
            [
              [0,0,2,0], 
              [0,2,2,0],
              [0,2,0,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [2,2,0,0],
              [0,2,2,0],
              [0,0,0,0]
            ]
  ];

  var JF = [
            [
              [0,3,0,0], 
              [0,3,0,0],
              [0,3,3,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [0,3,3,3],
              [0,3,0,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [0,3,3,0],
              [0,0,3,0],
              [0,0,3,0]
            ],
            [
              [0,0,0,0], 
              [0,0,3,0],
              [3,3,3,0],
              [0,0,0,0]
            ]
  ];

  var LF = [
            [
              [0,0,0,0], 
              [0,4,4,0],
              [0,4,0,0],
              [0,4,0,0]
            ],
            [
              [0,0,0,0], 
              [4,4,4,0],
              [0,0,4,0],
              [0,0,0,0]
            ],
            [
              [0,0,4,0], 
              [0,0,4,0],
              [0,4,4,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [0,4,0,0],
              [0,4,4,4],
              [0,0,0,0]
            ]
  ];

  var TF = [
            [
              [0,5,0,0],
              [0,5,5,0],
              [0,5,0,0],
              [0,0,0,0]
            ],
            [
              [0,0,0,0], 
              [5,5,5,0],
              [0,5,0,0],
              [0,0,0,0]
            ],
            [
              [0,5,0,0], 
              [5,5,0,0],
              [0,5,0,0],
              [0,0,0,0]
            ],
            [
              [0,5,0,0], 
              [5,5,5,0],
              [0,0,0,0],
              [0,0,0,0]
            ]
  ];

  var IF = [
            [
              [0,0,6,0], 
              [0,0,6,0],
              [0,0,6,0],
              [0,0,6,0]
            ],
            [
              [0,0,0,0], 
              [0,0,0,0],
              [6,6,6,6],
              [0,0,0,0]
            ],
            [
              [0,0,6,0], 
              [0,0,6,0],
              [0,0,6,0],
              [0,0,6,0]
            ],
            [
              [0,0,0,0], 
              [0,0,0,0],
              [6,6,6,6],
              [0,0,0,0]
            ]
  ];

  var OF = [
            [
              [0,7,7,0], 
              [0,7,7,0],
              [0,0,0,0],
              [0,0,0,0]
            ],
            [
  	          [0,7,7,0], 
  	          [0,7,7,0],
  	          [0,0,0,0],
  	          [0,0,0,0]
            ],
            [
  	          [0,7,7,0], 
  	          [0,7,7,0],
  	          [0,0,0,0],
  	          [0,0,0,0]
            ],
            [
  	          [0,7,7,0], 
  	          [0,7,7,0],
  	          [0,0,0,0],
  	          [0,0,0,0]
            ]
  ];
  
  /* Taille du cube de base de toutes les shape */
  var CUBE_SIZE = 30;

  /* Couleurs des formes */
  var formColor = new Array("#81e7f5","#0eb16c","#404fff","#fcd836","#c681f5","#7ffd29","#ff0000","#ff0001");

  /** Taille du plan en pixel */
  var PLAYGROUND_HEIGHT = 600;
  var PLAYGROUND_WIDTH = 300;
  var PLAYGROUND_IMAGE = "/images/background.png"; // ajout d'une image sur le fond 

  /* Canvas */
  var canvas = $('#tetris');
  var ctx = canvas[0].getContext('2d');

  /* Touches clavier */
  var LeftNN  ='37';
  var RightNN ='39';
  var UpNN    ='38';
  var DownNN  ='40';
  var SpaceNN ='32';

  var LeftIE  ='';
  var RightIE ='';
  var UpIE    ='';
  var DownIE  ='';
  var SpaceIE ='';

  var speed = 2;
  var nbLines;
  var XP= 3;
  var YP= -1;
  var ROT= 0;
  var POS= 0;

  // la surface du jeu
  var TX=10;
  var TY=20;
  var PLAN = new Array();

  var currentShape;
  var nextShape;
  var intervalId;
  
  
  createPlan = function(plan) {
    // on cree les lignes les unes après les autres
    for(var i=0; i<TY; i++)
       plan[i] = new Array();

    // on parcourt les lignes...
    for(var i=0; i<TY; i++)
       for(var j=0; j<TX; j++)
          plan[i][j] = 0;  
  }

  init = function(){
    // keyboard listener
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    createPlan(PLAN);
    drawBackground();
  }

  // Keylistener down
  keyDown = function(e) {
    var KeyNN =0;
    var KeyIE =0;
    var evt = e ? e:event;
    KeyNN =evt.keyCode;
    KeyIE =evt.keyCode;
    //console.log('keyDown KeyNN='+KeyNN+', KeyIE='+KeyIE);

    if( LeftNN.indexOf(KeyNN)!=-1  || LeftIE.indexOf(KeyIE)!=-1 ){
      moveLeft(currentShape);
    }

    if( RightNN.indexOf(KeyNN)!=-1  || RightIE.indexOf(KeyIE)!=-1 ){
      moveRight(currentShape);
    }

    if( UpNN.indexOf(KeyNN)!=-1  || UpIE.indexOf(KeyIE)!=-1 ){
      rotate(currentShape);
    }  

    if( DownNN.indexOf(KeyNN)!=-1  || DownIE.indexOf(KeyIE)!=-1 ){
      moveDown();
    }  

    if( SpaceNN.indexOf(KeyNN)!=-1  || SpaceIE.indexOf(KeyIE)!=-1 ){
      fall();
    }  

  }

  // Keylistener up
   keyUp = function(e) {
    var KeyNN=0;
    var KeyIE=0;
    var evt = e?e:event;
    KeyNN=evt.keyCode;
    KeyIE=evt.keyCode;
    //console.log('keyUp KeyNN_='+KeyNN_+', KeyIE_='+KeyIE_);  

    if( DownNN.indexOf(KeyNN)!=-1  || DownIE.indexOf(KeyIE)!=-1 ){
      moveDownUp();
    }  
  }

  drawBackground = function(){
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.fillRect(0,0,PLAYGROUND_WIDTH,PLAYGROUND_HEIGHT);
    ctx.strokeRect(0,0,PLAYGROUND_WIDTH,PLAYGROUND_HEIGHT); 
    drawGrid();
  }

  drawGrid = function() {
    drawHorizontalGrid();
    drawVerticalGrid();
  }

  drawHorizontalGrid = function() {
    for(var i=0;i<=(PLAYGROUND_HEIGHT/30)-1;i++){
      ctx.beginPath();
      ctx.moveTo(0,i*30);
      ctx.lineWidth = 0.2;
      ctx.lineTo(PLAYGROUND_WIDTH,i*30);
      ctx.closePath();
      ctx.stroke();
    }
  }

  drawVerticalGrid = function() {
    for(var i=0;i<=(PLAYGROUND_WIDTH/30)-1;i++){
      ctx.beginPath();
      ctx.moveTo(i*30,0);
      ctx.lineWidth = 0.2;
      ctx.lineTo(i*30,PLAYGROUND_HEIGHT);
      ctx.closePath();
      ctx.stroke();
    }
  }

  initShape = function(){
    switch(Math.round(Math.random()*6)){
  		case 0 : return ZF;
  		case 1 : return SF;
  		case 2 : return JF;
  		case 3 : return LF;
  		case 4 : return TF;
  		case 5 : return IF;
  		case 6 : return OF;
    }
  	return null;
  }

  initNextShape = function(){
    currentShape=nextShape;
    nextShape=initShape();
    XP=3;
    YP=-1;
    ROT=0;
  }

  moveLeft = function(shape){
    var x,y;
    for (y=0; y<4; y++)
      for (x=0; x<4; x++)
        // si forme n'est pas dans l'espace ou se superpose : rien
        if ( shape[ROT][y][x] && ( (XP-1+x<0) 
          || (PLAN[(YP+y)] && PLAN[(YP+y)][(XP-1+x)]) )  )
          return;
        XP--;  
  }

  moveRight = function(shape){
    var x,y;
    for (y=0; y<4; y++)
      for (x=0; x<4; x++)
        // si forme n'est pas dans l'espace ou se superpose : rien
        if ( shape[ROT][y] && shape[ROT][y][x] && ( (XP+1+x>=TX) 
          || (PLAN[(YP+y)] && PLAN[(YP+y)][(XP+1+x)]) )  )
          return;
      XP++;
  }

  rotate = function(shape){
    var next, x, y;
    // changer forme à droite ou à gauche (-1 ou +1)
    next = (ROT+1+4)%4;
    // vérifier que la forme reste dans le plan et qu'elle ne se superpose pas
    // à une autre 
    for (y=0; y<4; y++)
      for (x=0; x<4; x++)
        if ( (shape[next][y][x]) && 
            (XP+x <0 || XP+x >=TX || YP+y >=TY || PLAN[(YP+y)][(XP+x)])  )
          return;
      ROT=next;
  }

  moveDown = function(){
  	var speedDown=30;
  	clearInterval(intervalId);
    intervalId = setInterval(loop, 1000/ speedDown);  
  }

  moveDownUp = function(){
    clearInterval(intervalId);
    intervalId = setInterval(loop, 1000/ speed);		
  }

  fall = function(){
    // todo
  }

  fixShape = function(shape){
    var x,y;
    for (y=0; y<4; y++){
      for (x=0; x<4; x++){
        if (shape[ROT][y][x]){
  				var y2 = (YP+y);
  				var x2 = (XP+x);
          PLAN[y2][x2]=shape[ROT][y][x];
        }	
      }
    }
  }

  drawShape = function(shape){
    var x,y;
    drawBackground();    
    for(y=0; y<4; y++) {
      for(x=0; x<4; x++) {
        if(shape[ROT][y][x]){
          x2=x+XP;
          y2=y+YP;
          drawCube(x2*CUBE_SIZE,y2*CUBE_SIZE,formColor[shape[ROT][y][x]]);
        }        
      }
    }
    redrawPlan();
  }

  redrawPlan = function(){
    for(var i=0; i<TY; i++){
      for(var j=0; j<TX; j++){			
        if(PLAN[i][j] != 0){
          drawCube(j*CUBE_SIZE,i*CUBE_SIZE,formColor[PLAN[i][j]]);
        }
      }
    }
  }

  drawCube = function(x,y,color) {
    ctx.fillStyle = "#000";
    ctx.fillRect(x,y,CUBE_SIZE,CUBE_SIZE);  
    ctx.fillStyle = color;
    ctx.fillRect(x+4,y+4,22,22);
  }

  countEmptyLines = function(lines) {
  	var y;
  	var x;
  	var count=0;

    for (y=0; y<TY; y++){
    	for (x=0; x<TX; x++)
      	if(!PLAN[y][x])
  		  	break;

  			if (x==TX){
        	lines[y]=1;
  		 		count++;
  			}
  		}
  		return count;
  }

  removeEmptyLines = function(lines)
  {
  	var tmpPlan = new Array();
  	var y;
  	var k;	
  	createPlan(tmpPlan);

    for (y=TY-1,k=TY-1; y>0; y--)
       if(!lines[y]){
   				tmpPlan[k] = PLAN[y];
  		 k--;
  	  }

  	PLAN = tmpPlan;
  }

  down = function(shape) {
    var x,y,res=1;
    YP++;
    for(y=0; y<4; y++) {
      for(x=0; x<4; x++) {
        drawShape(shape);
        if( shape[ROT][y][x] && ((YP+1+y)>=TY||PLAN[(YP+1+y)][(XP+x)]) ){
          if(YP==0)
            res=-1;
          else
            res=0;
          // fin boucle éventuellement
          y=4;
          x=4;
        }
      }
    }
    return res;
  }

  loop = function(){    
  	var lines=[TY];
  	var rem;
    var pos=down(currentShape);	

  	// si impossibilité nouvelle pièce fin de la partie
    if (pos==-1){
  		clearInterval(intervalId);
  	} else if(pos==0) {
  	  // pièce suivante
  	  fixShape(currentShape);
  	  initNextShape();
  	  // compter lignes finies et les enlever
  		if (rem=countEmptyLines(lines)){
  	  	removeEmptyLines(lines);
        // mise à jour nombre de lignes finies
  			nbLines+=rem;
  		}  
  	}
  }

  this.startGame = function() {
    if(ctx){    
      init();
      var niveau= [70, 65, 60, 55, 50, 45, 40, 35, 30, 26, 22, 19, 
                      16, 14, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0];  

      currentShape = initShape();
      nextShape = initShape();    
      intervalId = setInterval(loop, 1000/ speed);

    } else {
      alert('No 2d context');
    }  
  }
  
}

// Lancement du jeu
var tetris = new tetris();
tetris.startGame();
