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

//Game Objects
fireBallImages= new Array();
fireBallImages[0] = new Image();
fireBallImages[0].src="images/fireball-2.png";
fireBallImages[1] = new Image();
fireBallImages[1].src="images/fireball-3.png" 
fireBallImages[2] = new Image();
fireBallImages[2].src="images/explosion-1.png" 
var player1 = {
    speed: 256,
    x:0,
    y:0,
    attacking: false
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
            spriteImage.src="images/ninja-1.png";
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
    spriteImage.src="images/ninja-2.png";
    }
 }

 if (37 in keysDown) {
    player1.x -= player1.speed * modifier;
 }
 if (39 in keysDown) {
    player1.x += player1.speed * modifier;
 }


updateWeapons(modifier);

 
}

var updateWeapons = function(modifier) {
    fireBalls.forEach(ball => {
        if(ball.active){
        ball.x += (ball.speed*ball.direction*modifier);

        if (ball.x%8 < 4) {
        ball.current= 0;
        }
        else {
            ball.current = 1;
        }
        if (ball.x>canvas.width-200){
            ball.current=2;
            ball.active = false;
            
        }
    }
    else {
        // fireBalls.splice(fireBalls.indexOf(ball),1);
    }
    });
}

function launchFireBall(){
    var fireBall = {
        speed:212,
        x:player1.x,
        y:player1.y,
        direction: 2,
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
		ctx.drawImage(spriteImage, player1.x, player1.y);
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

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

var then = Date.now();
    main();