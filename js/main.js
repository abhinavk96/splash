//Create the canvas

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
console.log("Canvas Created");

//Backgorund image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
}
bgImage.src = "images/bg.jpg";

//sprite image
var spriteReady = false;
var spriteImage = new Image();
spriteImage.onload = function () {
    spriteReady = true;
}
spriteImage.src = "images/ninja-1.png";

spriteImages = new Array();
spriteImages[0] = new Image();
spriteImages[0].src = "images/ninja-1.png";
spriteImages[1] = new Image();
spriteImages[1].src = "images/ninja-2.png";
spriteImages[2] = new Image();
spriteImages[2].src = "images/ninja-3.png";
spriteImages[3] = new Image();
spriteImages[3].src = "images/ninja-4.png";
spriteImages[4] = new Image();
spriteImages[4].src = "images/ninja-i1.png";
spriteImages[5] = new Image();
spriteImages[5].src = "images/ninja-i2.png";
spriteImages[6] = new Image();
spriteImages[6].src = "images/ninja-i3.png";
spriteImages[7] = new Image();
spriteImages[7].src = "images/ninja-i4.png";

//Game Objects
fireBallImages= new Array();
fireBallImages[0] = new Image();
fireBallImages[0].src="images/fireball-2.png";
fireBallImages[1] = new Image();
fireBallImages[1].src="images/fireball-3.png" 
fireBallImages[2] = new Image();
fireBallImages[2].src="images/explosion-1.png" 
fireBallImages[3] = new Image();
fireBallImages[3].src="images/fireball-i2.png";
fireBallImages[4] = new Image();
fireBallImages[4].src="images/fireball-i3.png" 
fireBallImages[5] = new Image();
fireBallImages[5].src="images/explosion-i1.png" 
var player1 = {
    speed: 256,
    x:0,
    y:0,
    attacking: false,
    width: 50,
    height: 100,
    directionLR:1,
    current: 0
}

//Player input
var keysDown = {};
var fireBalls = [];
var fireBallActive=false;
addEventListener("keydown", function (e) {
    console.log(e.keyCode);
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    if (e.keyCode == 70){
        fireBallActive = false;
        setInterval(function(){
            if(player1.directionLR){
                player1.current=0;
            }
            else{
                player1.current=4;
            }
            player1.width=50;
        },600);
        
    }
    delete keysDown[e.keyCode];
    
}, false);


//update fuction
var update = function(modifier) {
 if (38 in keysDown) {
    player1.y -= player1.speed * modifier;
 }
 if (40 in keysDown) {
    player1.y += player1.speed * modifier;
 }

 if (70 in keysDown) {
    if(!fireBallActive) {
    newFireBall = launchFireBall();
    fireBalls.push(newFireBall);
    console.log("Ball fired");
    fireBallActive = true;
    if(player1.directionLR){
        player1.current=1;
    }
    else {
    player1.current=5;          
    }
    player1.width = 75
    }
 }

 if (37 in keysDown) {
    player1.x -= player1.speed * modifier;
    player1.directionLR = 0;
    player1.width = 50    
    if (player1.x%40 < 20){
        player1.current=6;        

    }
    else {
    player1.current=7;          
    }
 }
 if (39 in keysDown) {
    player1.x += player1.speed * modifier;
    player1.width = 50
    
    player1.directionLR = 1
    if (player1.x%40 < 20){
        player1.current=2;

    }
    else {
    player1.current=3;                 
    }
 }


updateWeapons(modifier);

 
}

var updateWeapons = function(modifier) {
    fireBalls.forEach(ball => {
        if(ball.active){
        
        if(ball.direction){
            ball.x += (ball.speed*modifier);
            offset=0;
        }
        else{
        ball.x -= (ball.speed*modifier);   
        offset=3;         
        }

        if (ball.x%8 < 4) {
        ball.current= 0 + offset;
        }
        else {
            ball.current = 1 + offset;
        }
        if (ball.x>canvas.width-220){
            ball.current=2 + offset;
            ball.active = false;
            
        }
    }
    else {
        // destroy(ball, fireBalls);
    }
    });
}

var destroy = function(object, array) {
    setInterval(function(){
        array.splice(array.indexOf(object),1);        
    }, 1000);
}

function launchFireBall(){
    var fireBall = {
        speed:512,
        x:player1.x,
        y:player1.y,
        direction: player1.directionLR,
        current: 0,
        active:true
    }
    console.log("should get drawn");
    return fireBall;
}

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
    }
    if (spriteReady) {
		ctx.drawImage(spriteImages[player1.current], player1.x, player1.y, player1.width, player1.height);
    }
    fireBalls.forEach(ball => {
	    ctx.drawImage(fireBallImages[ball.current], ball.x, ball.y);            
    });
    
}

var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};

var then = Date.now();
    main();