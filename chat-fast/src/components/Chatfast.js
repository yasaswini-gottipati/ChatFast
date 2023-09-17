import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {allUsersRoute,server} from '../utils/Apiroutes';
import Contacts from './Contacts';
import Initial from './Initial';
import Contains from './Contains';
import {io} from "socket.io-client";


function Chatfast() {
  const socket=useRef();
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const [current,setCurrent]=useState(undefined);
  const [currchat,setCurrchat]=useState(undefined);
  const [loaded,setLoaded]=useState(false);
  const [sele,setSele]=useState(true);
  useEffect(()=>{
    async function fun(){
    if(!localStorage.getItem('chat-fast-user')){
       navigate('/login');
    }
    else{
      setCurrent(await JSON.parse(localStorage.getItem('chat-fast-user')));
      setLoaded(true);
    }
  }
  fun();
  },[]);

  useEffect(()=>{
    if(current){
      socket.current=io(server);
      socket.current.emit("add-user",current._id);
    }
  },[current])

  useEffect(()=>{
    async function fetchData(){
      if(current){
        if(current.isAvathar){
          const datas=await axios.get(`${allUsersRoute}/${current._id}`);
          console.log(datas.data);
          setContacts(datas.data)
        }else{
          navigate("/avathar");
        }
      }
    }
    fetchData();
  },[current])
  
  const handlechat=(chat)=>{
    setCurrchat(chat);
    setSele(false);
  }

  return (
    <>
     <Container>
      <div className={`contains ${sele? "ok":""}`}>
        <Contacts cont={contacts} user={current} change={handlechat} />
        {loaded && currchat===undefined ?( <Initial user={current} /> ):( <Contains chat={currchat} user={current} socket={socket} />)}
      </div>
     </Container>  
    </>
  )
}
const Container =styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:1rem;
background-color:#131324;
.contains{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns:25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns:35% 65%;
  }
  @media screen and (min-width:360px) and (max-width:480px){
    grid-template-columns:0% 100%;
  }

}
.ok{
  @media screen and (min-width: 360px) and (max-width: 480px) {
    grid-template-columns:100% 0%;
  }
}
`;

export default Chatfast
