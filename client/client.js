var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true, query:{"alias": "desktop 2"}});

fetch("http://localhost:3000/api/voice-chat", {
    method: "post",
    body: JSON.stringify({"question": "send the code to desktop 2"}),
    headers: {
        "Content-Type": "application/json"
    }
})
.then(function(response) {
    return response.json();
})
.then((data)=>{
    console.log(data);
}) 
.catch(err => {
    console.log(err);
});

socket.on("code", (data) => {
    console.log(data.response);
})