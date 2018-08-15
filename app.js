var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});
app.use('/', express.static(__dirname+'/'));
serv.listen(2000);
console.log("Server Started");
var io = require('socket.io')(serv, {});
var SOCKETS_LIST={};
var playerCount=0;
io.sockets.on('connection', function(socket){
    playerCount++;
    console.log("Player "+playerCount+" connected");
    socket.id = playerCount;
    SOCKETS_LIST[socket.id] = socket;
    socket.on('clientData', function(data){
        // console.log(data.player);
        socket.player = data.player;
        socket.fireballs = data.fireballs;
        if(playerCount>=2){
            if(SOCKETS_LIST[1]){
            SOCKETS_LIST[1].emit('serverData', {
                player:SOCKETS_LIST[2].player,
                fireballs:SOCKETS_LIST[2].fireballs
            });
            SOCKETS_LIST[2].emit('serverData', {
                player:SOCKETS_LIST[1].player,
                fireballs:SOCKETS_LIST[1].fireballs
                
            });
        }}
    });
    socket.on('disconnect', function(){
        playerCount--;
        delete SOCKETS_LIST[socket.id];        
        if(socket.id==1 && playerCount==1){
            SOCKETS_LIST[1] = SOCKETS_LIST[2];
            delete SOCKETS_LIST[2];
        }
    })
});

// setInterval(function(){

// },100);