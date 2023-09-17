import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import pic from '../assets/logo.png';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import {loginRoute} from "../utils/Apiroutes";

const Formcontainer = styled.div`
height:100vh;
width: 100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
// gap:0.5rem;
background-color:#131324;
.icon{
  display:flex;
  justify-content:center;
  align-items:center;
  // gap:0.5rem;
  img{
    height:5rem;
  }
  h1{
    color:white;
  }
}
form{
  display:flex;
  flex-direction:column;
  gap:1.5rem;
  background-color:#00000076;
  padding: 1.5rem 4.5rem;
  border-radius:2rem;
  input{
    background-color:transparent;
    padding: 0.5rem;
    border: 0.15rem solid #82CD47;
    border-radius:0.4rem;
    color:white;
    width:100%;
    font-size:1rem;
    &:focus{
      border: 0.15rem solid #CD1818;
      outline:none;
    }
  }
  button{
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
  span{
    color:white;
    a{
      color:#16FF00;
      text-decoration:none;
    }
    padding-bottom:0.5rem;
  }
  
}

`;

const Login = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:"",
    password:"",
  })
  useEffect(()=>{
    if(localStorage.getItem('chat-fast-user')){
       navigate('/');
    }
  },[]);
  const handleSub = async(e)=>{
    e.preventDefault();
    if(handleValidation()){
      const {username,password} = values;
      const {data} =await axios.post(loginRoute,{
        username,
        password,
      });
      if(data.status ===false){
        toast.error(data.msg);
      }
      if(data.status ===true){
        localStorage.setItem("chat-fast-user",JSON.stringify(data.User));
        navigate("/");
      }
    }
  };

  const handlecha = (e)=>{
        setValues({...values,[e.target.name]:e.target.value});
  };

  const handleValidation = ()=>{
      const {username,password} = values;
      if(password===""){
        toast.error("password is required!!");
        return false;
      }
      else if(username.length===''){
        toast.error("Username is required!!");
        return false;
      }
      return true;
  };

  return (
    <>
    <Formcontainer>
      <form onSubmit={(e)=>handleSub(e)}>
        <div className="icon">
          <img src={pic} alt="logo" />
          <h1>ChatFast</h1>
        </div>
        <input type="text" placeholder='Username' name='username' min='3' onChange={(e)=>handlecha(e) } />
        <input type="password" placeholder='Password' name='password' onChange={(e)=>handlecha(e)} />
        <button type='submit'>Login</button>
        <span>Don't have an account? <Link to='/register'>Register Here</Link></span>
      </form>
    </Formcontainer>
    <ToastContainer position='top-center' autoClose='5000' pauseOnHover='true' draggable='true' theme='dark' />
    </>
  )
}

export default Login

