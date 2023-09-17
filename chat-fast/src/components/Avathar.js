import React,{useState,useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import styled from 'styled-components';
import loader from "../assets/loader.gif";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import {avatharroute} from "../utils/Apiroutes";
import {Buffer} from "buffer";

const Avathar = () => {
    const api="https://api.multiavatar.com/4567845";
    const navigate = useNavigate();
    const [ava,setAva]=useState([])
    const [selectedAvathar,setSelectedAvathar] = useState(undefined);
    const [loading,setLoading]= useState(true);
    useEffect(()=>{
      if(!localStorage.getItem('chat-fast-user')){
         navigate('/login');
      }
    },[]);

    async function setprofilepic(){
       if(selectedAvathar===undefined){
        toast.error("Please select an Avathar")
       }
       else{
        console.log(ava[selectedAvathar]);
        const user= await JSON.parse(localStorage.getItem("chat-fast-user"));
        const {data}= await axios.post(`${avatharroute}/${user._id}`,{
          image: ava[selectedAvathar]
        })
        if(data.isSet){
          user.isAvathar=true;
          user.avathar=data.image;
          localStorage.setItem("chat-fast-user",JSON.stringify(user));
          navigate('/')
        }
        else{
          toast.error("Please try again")
        }
       }
    };
    useEffect(()=>
    {
      async function fetchData(){
      const data =[];
      for(let i=0;i<3;i++){
        const image= await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
        const buffer =new Buffer(image.data);
        data.push(buffer.toString("base64"))
      }
      setAva(data);
      setLoading(false); 
    }
    fetchData();
    },[]);
  return (
    <>
    {
      loading?<Container>
        <img src={loader} alt="loader" className='loader' />
      </Container>
      :(
    <Container>
      <div className='title'>
          <h1>Select the Avathar</h1>
      </div>
      <div className='avathars'>{
        ava.map((avathar,id)=> {
           return(
            <div key={id} className={`avathar ${selectedAvathar===id ? "selected" : "" }`}>
              <img src={`data:image/svg+xml;base64,${avathar}`} alt="avathar" 
              onClick={()=>setSelectedAvathar(id)}
              />
            </div>
           )
        })
      }
      </div>
      <button className='sub' onClick={setprofilepic}>Set as Display Picture(DP)</button>
    </Container>
    )}
    <ToastContainer position='top-center' autoClose='5000' pauseOnHover='true' draggable='true' theme='dark' />
    </>
  )
}

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;
.loader{
  max-inline-size:100%
}
.title{
  h1{
    color:white;
  }
}
.avathars{
  display:flex;
  gap:2rem;
  .avathar{
    border:0.4rem solid transparent;
    padding:0.4rem;
    border-radius:5rem;
    display:flex;
    justify-content:center;
    align-items:center;
    transition:0.5s ease-in-out;
    img{
      height:6rem;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
       img{
        height:4rem;
       }
    }
  }
  .selected{
    border:0.4rem solid #82CD47;
  }
}
.sub{
  background-color:#82CD47;
    color:white;
    padding:1rem 2rem;
    border:none;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    font-weight:bold;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color: #16FF00 ;
    } 
}
`
export default Avathar
