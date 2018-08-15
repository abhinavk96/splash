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
    console.log("Player "+playerCount+" connected");
    socket.on('clientData', function(data){
        console.log(data.player);
    });
    socket.emit('serverData', {
        title:'server'
    });
})