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
io.sockets.on('connection', function(socket){
    console.log("Socket Function");
    socket.on('clientData', function(data){
        console.log(data.title);
    });
    socket.emit('serverData', {
        title:'server'
    });
})