//Create the canvas

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
console.log("Canvas Created");

//Backgorund image
var gravity = true;

isCollidigAbove = function() {
    if(player1.x + player1.width >= platforms[0].x && player1.x<=platforms[4].x+platforms[4].width || player1.x >= platforms[5].x && player1.x<=platforms[9].x+platforms[9].width){
        if(player1.y>platforms[0].y+platforms[0].height && player1.y<platforms[0].y+platforms[0].height +10 )
        return true;
    }
    return false;
}
isPlayerOnSurface = function(){
    console.log(player1.y,player1.height);
    if(player1.x + player1.width>= platforms[0].x && player1.x<=platforms[4].x+platforms[4].width && player1.y>=platforms[0].y-player1.height && player1.y<=platforms[0].y+5-player1.height){
        return true;
    }
    if(player1.x+ player1.width >= platforms[5].x && player1.x<=platforms[9].x+platforms[9].width && player1.y>=platforms[5].y-player1.height && player1.y<=platforms[5].y+5-player1.height){
        return true;
    }
    return false;
}

isPlayerFalling = function() {
    console.log(player1.y);
    
    if (player1.y < window.innerHeight - 200 - player1.height && !isPlayerOnSurface()){
        return true;
        
    }
    player1.isJumping = false;    
    player1.jumpDuration=40;

    return false;
}
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
}
bgImage.src = "images/bg.jpg";

var platformReady = false;
var platform = new Image();
platform.onload = function() {
    platformReady = true;
}
platform.src = "images/hover-1.png"
var groundReady = false;
var ground = new Image();
ground.onload = function() {
    groundReady = true;
}
ground.src = "images/ground-big.png";
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
spriteImages[8] = new Image();
spriteImages[8].src = "images/ninja-5.png";
spriteImages[9] = new Image();
spriteImages[9].src = "images/ninja-6.png";
spriteImages[10] = new Image();
spriteImages[10].src = "images/ninja-7.png";
spriteImages[11] = new Image();
spriteImages[11].src = "images/ninja-8.png";

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

platforms = new Array();
platforms[0] = {
    x:200,
    y:500,
    width:100,
    height:100
};
platforms[1] ={
    x:300,
    y:500,
    width:100,
    height:100
}
platforms[2] = {
    x:400,
    y:500,
    width:100,
    height:100
}
platforms[3] = {
    x:500,
    y:500,
    width:100,
    height:100
}
platforms[4] = {
    x:600,
    y:500,
    width:100,
    height:100
}
platforms[5] = {
    x:900,
    y:500,
    width:100,
    height:100
}
platforms[6] = {
    x:1000,
    y:500,
    width:100,
    height:100
}
platforms[7] = {
    x:1100,
    y:500,
    width:100,
    height:100
}
platforms[8] = {
    x:1200,
    y:500,
    width:100,
    height:100
}
platforms[9] = {
    x:1300,
    y:500,
    width:100,
    height:100
}
// platforms[10] = {
//     x:200,
//     y:200,
//     width:100,
//     height:100
// };
// platforms[11] ={
//     x:300,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[12] = {
//     x:400,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[13] = {
//     x:500,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[14] = {
//     x:600,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[15] = {
//     x:900,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[16] = {
//     x:1000,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[17] = {
//     x:1100,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[18] = {
//     x:1200,
//     y:200,
//     width:100,
//     height:100
// }
// platforms[19] = {
//     x:1300,
//     y:200,
//     width:100,
//     height:100
// }
var player1 = {
    speed: 256,
    x:0,
    y:0,
    attacking: false,
    width: 50,
    height: 100,
    directionLR:1,
    current: 0,
    isJumping:false,
    jumpDuration: 40
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
    if((!player1.isJumping || player1.jumpDuration)&&!isCollidigAbove()){
    player1.y -= player1.speed*4 * modifier;  
    player1.jumpDuration--;      
    }
    player1.isJumping = true;
 }
 if (40 in keysDown || isPlayerFalling()) {
    player1.y += player1.speed *2* modifier;
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
    if(player1.isJumping){
        player1.width=128;
        player1.height=100;
        if (player1.x%40 < 10){
            player1.current=8;
    
        }
        else if(player1.x%80 >=10 && player1.x%80<30){
            player1.current=9;            
        }
        else if(player1.x%80 >=30 && player1.x%80<60){
            player1.current=10;            
        }
        else {
        player1.current=11;                 
        }
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
    if (groundReady) {
    ctx.drawImage(ground, 0, window.innerHeight-200, window.innerWidth, 200);
    }

    if (platformReady) {
        platforms.forEach(object => {
        ctx.drawImage(platform, object.x, object.y, object.width, object.height);                    
        });
    }
    // ctx.drawImage(ground, 0, window.innerHeight-200);    
    
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