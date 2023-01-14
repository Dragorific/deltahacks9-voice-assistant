import dotenv from "dotenv";
import { ChatGPTAPIBrowser } from 'chatgpt';
import express from 'express'
import http from 'http'
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

async function main(){
    const api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL,
        password: process.env.OPENAI_PASSWORD
    })

    await api.initSession()
}

main();

io.on('connection', (socket) => {
    users = {};
    let alias = socket.handshake.query.alias;
    console.log('User '+alias+' connected with id: '+socket.id);
    users[alias] = socket.id;
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});