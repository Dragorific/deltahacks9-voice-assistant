var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true, query:{"alias": "desktop 2"}});

socket.on("code", (data) => {
    console.log(data.response);
})