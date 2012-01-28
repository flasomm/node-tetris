function Tetris() {
  
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
  var CUBE_SIZE;

  /** Taille du plan en pixel */
  var PLAYGROUND_HEIGHT;
  var PLAYGROUND_WIDTH;
  var PLAYGROUND_IMAGE; // ajout d'une image sur le fond 

  /* Canvas */
  var canvas = $('#tetris');
  var ctx = canvas[0].getContext('2d');
	var STROKE_STYLE;
	var FILL_STYLE;	

  /* Couleurs des formes */
  var FORM_COLOR;

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

  var nbLines = 0;
	var movedDown = false;
  var XP= 3;
  var YP= -1;
  var ROT= 0;
  var POS= 0;
  var SPEED;
	var time = 0;

  // la surface du jeu
  var TX;
  var TY;
  var PLAN = new Array();

  var currentShape;
  var nextShape;
  var timerId;
  var oldTimerId;
	var socket = io.connect('http://localhost');
	var stats = new Stats();	

  createPlan = function(plan) {
    // on cree les lignes les unes après les autres
    for(var i=0; i<TY; i++)
       plan[i] = new Array();

    // on parcourt les lignes...
    for(var i=0; i<TY; i++)
       for(var j=0; j<TX; j++)
          plan[i][j] = 0;  
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
      forceMoveDown();
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
      forceMoveDownUp();
    }  
  }

  drawBackground = function(){
    ctx.fillStyle = FILL_STYLE;
    ctx.strokeStyle = STROKE_STYLE;
    ctx.fillRect(0,0,PLAYGROUND_WIDTH,PLAYGROUND_HEIGHT);
    ctx.strokeRect(0,0,PLAYGROUND_WIDTH,PLAYGROUND_HEIGHT); 
    drawGrid();
  }

  drawGrid = function() {
    //drawHorizontalGrid();
    drawVerticalGrid();
  }

  drawHorizontalGrid = function() {
    for(var i=0;i<=(PLAYGROUND_HEIGHT/30)-1;i++){
      ctx.beginPath();
    	ctx.strokeStyle = "#0a1d36";			
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
    	ctx.strokeStyle = "#0a1d36";			
      ctx.moveTo(i*30,0);
      ctx.lineWidth = 0.2;
      ctx.lineTo(i*30,PLAYGROUND_HEIGHT);
      ctx.closePath();
      ctx.stroke();
    }
  }

  initShape = function(){
    switch(Math.round(Math.random()*6)){
  		case 0 : 
				stats.setShape(1);
				return ZF;
  		case 1 : 
				stats.setShape(2);
				return SF;
  		case 2 : 
				stats.setShape(3);
				return JF;
  		case 3 : 
				stats.setShape(4);
				return LF;
  		case 4 : 
				stats.setShape(5);
				return TF;
  		case 5 : 
				stats.setShape(6);
				return IF;
  		case 6 : 
				stats.setShape(7);
				return OF;
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

  forceMoveDown = function(){
  	var speedDown=30;
  	clearInterval(timerId);
    timerId = setInterval(main, 1000/ speedDown);  
		movedDown = true;
  }

  forceMoveDownUp = function(){
    clearInterval(timerId);
    timerId = setInterval(main, 1000/ SPEED);
		movedDown = false;
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
          drawCube(x2*CUBE_SIZE,y2*CUBE_SIZE,FORM_COLOR[shape[ROT][y][x]]);
        }        
      }
    }
    redrawPlan();
  }

  redrawPlan = function(){
    for(var i=0; i<TY; i++){
      for(var j=0; j<TX; j++){			
        if(PLAN[i][j] != 0){
          drawCube(j*CUBE_SIZE,i*CUBE_SIZE,FORM_COLOR[PLAN[i][j]]);
        }
      }
    }
  }

  drawCube = function(x,y,color) {
    ctx.fillStyle = "#194681";
    ctx.fillRect(x,y,CUBE_SIZE,CUBE_SIZE);  
    ctx.fillStyle = color;
    ctx.fillRect(x+4,y+4,26,26);
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

  main = function(){    
  	var lines=[TY];		
  	var rem;
    var pos= down(currentShape);
		var piece;

		// if (piece>niveau[SPEED]){
		// 	console.log("niveau[speed]:"+niveau[SPEED]);
		// }

  	// si impossibilité nouvelle pièce ou temps écoulé fin de la partie
    if (pos==-1){
  		clearInterval(timerId);
			stats.stop();

  	} else if(pos==0) {
  	  // pièce suivante
  	  fixShape(currentShape);
  	  initNextShape();

  	  // compter lignes finies et les enlever
  		if (rem=countEmptyLines(lines)){
  	  	removeEmptyLines(lines);

        // mise à jour nombre de lignes finies
  			nbLines+=rem;
				stats.setLines(stats.getLines() + nbLines);
				stats.setScore(stats.getScore() + (1000 * stats.getLevel() * nbLines));
				// if(movedDown){
				// 	stats.setScore(stats.getScore() + 5 + stats.getLevel());
				// }

			  // mise à jour speed 
			  //SPEED=nbLines/2;
			  if (SPEED>=25){
			     //prévoir qqchose : jeu gagné
			  }

  		}
  	}
  }
	
	// Lancement du jeu
  this.start = function() {	
    if(ctx){
	    // keyboard listener
	    document.onkeydown = keyDown;
	    document.onkeyup = keyUp;

		  socket.emit('init_game');		
		  socket.on('init_game', function (data) {

				PLAYGROUND_IMAGE 	= data.parameters.playgroundImage;
				PLAYGROUND_HEIGHT = data.parameters.playgroundHeight;
				PLAYGROUND_WIDTH 	= data.parameters.playgroundWidth;								
				PLAYGROUND_IMAGE 	= data.parameters.playgroundImage;
				CUBE_SIZE 				= data.parameters.cubeSize;
				TX 								= data.parameters.tx;
				TY 								= data.parameters.ty;
	 			FORM_COLOR 				= data.parameters.formColor;
				STROKE_STYLE 			= data.parameters.strokeStyle;
				FILL_STYLE 				= data.parameters.fillStyle;
				SPEED 						= data.parameters.speed;

		    createPlan(PLAN);
		    drawBackground();		
		    currentShape = initShape();
		    nextShape = initShape();
				timerId = setInterval(main, 1000/ SPEED);						
				stats.start();				
		  });

    } else {
      alert('No 2d context');
    }  
  }

	this.pause = function() {		
		stats.pause();				
		if(timerId>0){
	 		clearInterval(timerId);
			timerId=0;	
		} else {
      timerId = setInterval(main, 1000/ SPEED);			
		}
	}
	
	this.highscores = function() {
		
	}
  
	this.about = function() {
		
	}

}

function Stats(){
	var level;
	var time;
	var lines;
	var score;
	var shape;
	
	var drawInterval = 50;
	var frameCount = 0;
	var fps = 0;
	var maxfps;
	var lastTime;

	var timerId = null;	
	var fpsId = null;	
		
	var el = {
		"level": $(".tetris_level"),
		"time":  $(".tetris_time"),
		"fps":   $(".tetris_fps"),
		"lines": $(".tetris_lines"),
		"score": $(".tetris_score"),
		"shape": $(".shape")		
	}
	
	updateFps = function(){
		var now = new Date();
		var diffTime = Math.ceil((now.getTime() - lastTime.getTime()));
		if (diffTime >= 1000) {
			fps = frameCount;
			frameCount = 0.0;
			lastTime = now;
		}		
		el.fps.html(fps + '/' + maxfps);					
		frameCount++;		
	  setTimeout( this.updateFps, drawInterval );
	}	
	
	incTime = function() {
		time++;
		el.time.html(time);
		//updateFps();
	}

	reset = function() {		
		this.stop();
		level = 1;
		time  = 0;
		shape = null;
		fps   = 0;
		lines = 0;
		score = 0;
		maxfps = 1 / (drawInterval / 1000);
		lastTime = new Date();

		el.level.html(level);
		el.time.html(time);
		el.fps.html(fps);
		el.lines.html(lines);
		el.score.html(score);
	}

	this.start = function() {
		reset();
		timerId = setInterval(incTime, 1000);
	}

	this.pause = function(){
		if(timerId>0){
	 		clearInterval(timerId);				
			timerId=0;
		} else {
			timerId = setInterval(incTime, 1000);			
		}
	}

	this.stop = function()
	{
		if (timerId) {
			clearInterval(timerId);
		}
	}
	
	this.setScore = function(i) {
		score = i;
		el.score.html(score);
	}
	
	this.setLevel = function(i){
		level = i;
		el.level.html(level);		
	}

	this.setTime = function(i){
		time = i;
		el.time.html(time);				
	}

	this.setLines = function(i){
		lines = i;
		el.lines.html(lines);				
	}

	this.setShape = function(i){
		shape = i;
		var img = '<img src="/images/shapes/'+shape+'.png">';
		el.shape.html(img);				
	}
	
	this.getScore = function() {
		return score;
	}

	this.getLevel = function() {
		return level;
	}
	
	this.getTime = function() {
		return time;
	}

	this.getLines = function() {
		return lines;
	}
	
}
