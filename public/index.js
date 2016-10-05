$.get('/ajax', function(data) {
    console.log(data);
});

var socket = io();

socket.on('connect', function(data) {
    socket.emit('join', 'Hello world, from client');
});
