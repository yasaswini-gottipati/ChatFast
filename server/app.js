require("dotenv").config();
const http = require("http");
const express= require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const messageRoutes=require("./routes/messagesRoutes");

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("mongodb connected successfully");
}).catch((e)=>{
    console.log(e.message);
})

const app=express();
const port=process.env.PORT;
app.use(cors({
    origin:["http://localhost:3000","https://chat-front-app.onrender.com"],
    methods:["POST","GET"],
    credentials: true
}));
app.use(express.json());



app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);
app.get("/",(req,res)=>{
    res.send("<h1>it is working</h1>");
})

const server=http.createServer(app);
const io=socketIO(server,{
    cors:{
        origin:["http://localhost:3000","https://chat-front-app.onrender.com"],
        credentials:true,
    },
});

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    console.log("new connection");
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    })
})


server.listen(port,()=>{
    console.log(`server is working on ${port}`);
})
