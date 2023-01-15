var io = require('socket.io-client');
var robot = require("robotjs");
const fs = require('fs');

var socket = io.connect('http://localhost:3000', {reconnect: true, query:{"alias": "desktop 2"}});

socket.on("code", (data) => {
    typeString(data.response);
})

socket.on("append", (data) => {
    fs.appendFile(data.file, data.code, function (err) {
        if(err) {
            console.log(err);
        }
    });
})

fetch("http://localhost:3000/api/voice-chat", {
    method: "post",
    body: JSON.stringify({"question": "add the code to test.py in desktop 2"}),
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

function typeString(str){
    const MATCH_REGEX = /[~!@#\$%\^&*()_+{}|:"<>?]/;

    // minimize delay between robot keyboard calls
    robot.setKeyboardDelay(1);

    while (str) {
    let match = str.match(MATCH_REGEX);

    if (match) {
        robot.typeString(str.substr(0, match['index']));
        robot.keyTap(match[0], ['shift']);
        str = str.substr(match['index']+1);
    }
    else {
        robot.typeString(str);
        str = null;
    }
    }
}