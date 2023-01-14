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
        password: process.env.OPENAI_PASSWORD,
    })
    
    let users = {};

    await api.initSession()
    io.on('connection', async (socket) => {
        let alias = socket.handshake.query.alias;
        console.log('User '+alias+' connected with id: '+socket.id);
        users[alias] = socket.id;
    
        const result = await api.sendMessage('What is rust programming language')
        console.log(result.response)
    });
}

main();

server.listen(3000, () => {
    console.log('listening on *:3000');
});