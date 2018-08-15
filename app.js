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
    socket.id = Math.floor(Math.random()*10);
    SOCKETS_LIST[playerCount] = socket;
    socket.on('clientData', function(data){
        // console.log(data.player);
        socket.player = data.player;
        if(playerCount==2){
            if(SOCKETS_LIST[1]){
            SOCKETS_LIST[1].emit('serverData', {
                player:SOCKETS_LIST[2].player
            });
            SOCKETS_LIST[2].emit('serverData', {
                player:SOCKETS_LIST[1].player
            });
        }}
    });
});

// setInterval(function(){

// },100);