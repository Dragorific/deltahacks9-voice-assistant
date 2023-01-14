import dotenv from "dotenv";
import { ChatGPTAPIBrowser } from 'chatgpt';
import express from 'express'
import http from 'http'
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())

async function main(){
    const api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL,
        password: process.env.OPENAI_PASSWORD,
    })
    
    let users = {};

    await api.initSession()

    app.post("/api/voice-chat", async (res, req) => {
        const message = req.body.question;
        console.log(message);
        const result = await api.sendMessage(message);
        res.json({"response": result});
    })

    io.on('connection', async (socket) => {
        let alias = socket.handshake.query.alias;
        console.log('User '+alias+' connected with id: '+socket.id);
        users[alias] = socket.id;

        socket.on("new message", async (data) => {
            console.log(data.question);
            const result = await api.sendMessage(data.question);
            io.to(users["desktop 2"]).emit("response", {"response": result.response});
        })
    });
}

main();

server.listen(3000, () => {
    console.log('listening on *:3000');
});