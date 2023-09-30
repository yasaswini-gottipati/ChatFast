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
    origin:"https://chat-fast-frontend.vercel.app/",
    methods:["POST","GET"],
    credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://chat-fast-frontend.vercel.app/'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);
app.get("/",(req,res)=>{
    res.send("<h1>it is working</h1>");
})

const server=http.createServer(app);
const io=socketIO(server,{
    cors:{
        origin:"https://chat-fast-frontend.vercel.app/",
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
