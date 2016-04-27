/**
 * Created by fabien on 27/04/16.
 */

var http = require('http');

var server = http.createServer(function(req, res) {

});

// Chargement de socket.io
var io = require('socket.io').listen(server);

var rooms =  [{
    name: 'default',
    messages: [{
        content: "Salut les gens",
        username: "bgdu06",
        createdAt: new Date()
    }]
}];


// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {

    socket.emit("messages", rooms);

    socket.on('message', function (message) {
        message.createdAt = new Date();
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].name == message.room) {
                rooms[i].messages.push(message);
                break;
            }
        }
        io.sockets.emit('messages', messages);
    })
    socket.on('wizz', function(room){
        io.sockets.emit("wizz", room);
    });

    socket.on('roomcreation', function(name) {
        rooms.push({
            name: name,
            messages: []
        });
    })

});



server.listen(1337);