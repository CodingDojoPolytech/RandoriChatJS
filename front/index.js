/**
 * Created by fabien on 27/04/16.
 */

var ws = io.connect("http://localhost:1337");

var currentRoom = 'default';

ws.on("messages", function(rooms) {
    var room = rooms.filter(function (room) {
        return room.name == currentRoom;
    });




    if (room.length == 1) {
        var messages = room[0].messages;
        // messages
        $('#messages').html(messages.reduce(function (previous, current) {

            return previous + '<p class="message">' + '[' + new Date(current.createdAt).toLocaleString() + "] " + current.username
                + " : " + current.content + '</p>';
        }, ''));
    }

})

ws.on("wizz", function(name){
    if (currentRoom == name) {
        $('.room').effect("shake");
        var a = new Audio("http://s1download-universal-soundbank.com/mp3/sounds/nudge.mp3");
        a.play();
    }
})

$('#form-msg').on('submit', function(e) {
    e.preventDefault();
    var msg = {
        content : $('#msg').val(),
        username :  $('#user').val(),
        room: currentRoom
    };

    ws.emit('message',msg);
    $('#msg').val('');
})

$('#joinRoom').click(function(){
    $('.room').getElementsByTagName("H3")
})

$('#wizzBtn').click(function(){
    ws.emit('wizz');
})

$('#room_form').on('submit', function(e) {
    e.preventDefault();

    ws.emit('roomcreation',$('#room_name').val());

    changeroom($('#room_name').val());

    $('#room_name').val('');
})

var changeroom = function(name){
    $('#joinRoom').html(name);
}
