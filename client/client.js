var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true, query:{"alias": "desktop 2"}});

socket.emit("new message", {"question": "What is bash"});

socket.on("response", (data) => {
    console.log(data.response);
})