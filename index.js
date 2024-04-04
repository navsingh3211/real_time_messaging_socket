import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);
io.on('connection',(socket)=>{
  // console.log('user connected',socket.id);
  socket.on('user-message',(message)=>{
    // console.log("A new user message",message);
    io.emit("chatMessage",message);
  })
});

app.use(express.static(path.resolve("./public")));

app.get("/",(req,res)=>{
  return res.sendFile("/public/index.html");
});

server.listen(8085,()=>{
  console.log('connection established...');
})