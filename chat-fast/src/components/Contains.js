import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import Input from './Input';
import axios from 'axios';
import {v4 as uuidv4} from "uuid";
import { getAllMessagesRoute, sendMessageRoute } from '../utils/Apiroutes';



function Contains({chat,user,socket}) {

  const [messages,setMessages]=useState([]);
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const scrollRef=useRef(); 

  useEffect(()=>{
    async function fetchData(){
      if(chat){
    const res=await axios.post(getAllMessagesRoute,{
      from:user._id,
      to:chat._id,
    });
    setMessages(res.data);
  }
  }
  fetchData();
  },[chat])


  async function handlemsg(msg){
    await axios.post(sendMessageRoute,{
      from:user._id,
      to:chat._id,
      message:msg,
    });
    socket.current.emit("send-msg",{
      to:chat._id,
      from:user._id,
      message: msg,
    });

    const msgs=[...messages];
    msgs.push({fromSelf:true,message:msg});
    setMessages(msgs);
  }
  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf:false,message:msg})
      })
    }
  },[]);

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])

  return (
    <>
    { chat &&
    (<Container>
        <div className="head">
            <div className="details">
                <div className="avathar">
                <img src={`data:image/svg+xml;base64,${chat?.avathar}`} alt="avathar" />
                </div>
                <div className="username">
                    <h3>{chat?.username}</h3>
                </div>
            </div>
            <Logout />
        </div>
          <div className="chat-messages">
            {
              messages.map((mess)=>{
                return(
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${mess.fromSelf ? "sender":"reciever"}`}>
                        <div className="content">
                          <p>
                            {mess.message}
                          </p>
                        </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        <div className="input">
          <Input handlemsg={handlemsg} />
        </div>
    </Container>)
}
    </>
  )
}
const Container=styled.div`
padding-top:0.8rem;
display:grid;
grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow:hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  grid-auto-rows:15% 70% 15%;
}
  .head{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0.3rem;
    padding-right:1rem;
    .details{
        display:flex;
        align-items:center;
        gap:1rem;
        .avathar{
            img{
                height:3rem;
            }
        }
        .username{
          h3{ color:white;}
        }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .reciever {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default Contains
