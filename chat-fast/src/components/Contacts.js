import React,{useState,useEffect}  from 'react'
import styled from 'styled-components';
import logo from "../assets/logo.png";

function Contacts({cont,user,change}) {
    const [currentu,setCurrentu]=useState(undefined);
    const [currentim,setCurrentim]=useState(undefined);
    const [currentsel,setCurrentsel]=useState(undefined);

    useEffect(()=>{
      if(user){
        setCurrentim(user.avathar);
        setCurrentu(user.username);
      }
    },[user])

    const changeChat=(id,contact)=>{
      setCurrentsel(id);
      change(contact);
    };

  return (
    <>
    {currentim && currentu && (
    <Container>
       <div className="logo">
        <img src={logo} alt='logo' />
        <h3>Chat Fast</h3>
       </div>
       <div className="contacts">
        { cont.map((contact,id)=>{
            return (
                <div key={id} className={`contact ${currentsel===id ? "selected" : ""}`} onClick={()=>{changeChat(id,contact)}}>
                    <div className="avathar">
                        <img src={`data:image/svg+xml;base64,${contact.avathar}`} alt="avathar" />
                    </div>
                    <div className="username">
                        <h3>{contact.username}</h3>
                    </div>
                </div>
            )
        })
        }
       </div>
       <div className="current-user">
        <div className="avathar">
        <img src={`data:image/svg+xml;base64,${currentim}`} alt="avathar" />
                    </div>
                    <div className="username">
                        <h3>{currentu}</h3>
                    </div>
        
       </div>

    </Container>
    ) }
    </>
  )
}
const Container=styled.div`
display:grid;
grid-template-rows:10% 75% 15%;
overflow:hidden;
background-color:#080420;
.logo{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
  img{
    height:4rem;
  }
  h3{color:white;}
  @media screen and (min-width:360px) and (max-width:480px){
    gap:0.05rem;
    padding-top:1rem;
    img{
      height:6rem;
    }
  }
  @media screen and (min-width:720px) and (max-width:1080px){

  }
}
.contacts{
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  overflow:auto;
  gap:0.9rem;
  &::-webkit-scrollbar{
   width:2rem;
   &-thumb{
    background-color:#ffffff;
    width:0.1rem;
    border-radius:1rem;
   }
  }
  .contact{
    background-color:#ffffff;
    min-height:5rem;
    width:90%;
    cursor:pointer;
    border-radius:0.2rem;
    padding:0.4rem;
    gap:0.2rem;
    display:flex;
    align-items:center;
    overflow:hidden;
    transition:0.5s ease-in-out;
    @media screen and (min-width:720px) and (max-width:1080px){
      width:29vw;
      gap:0.2rem;
      overflow:hidden;
    }
   .avathar{
    img{
      height:3rem;
    }
    @media screen and (min-width:720px) and (max-width:1080px){
        img{
          height:2rem;
        }
    }
   }
   .username{
    h3{
      color:black;
    }
    @media screen and (min-width:720px) and (max-width:1080px){
      h3{
        font-size:1rem;
      }
    }
   }
  }
  .selected{
    background-color:#82CD47;
  }
}
.current-user{
  background-color:#0d0d30;
  gap:0.5rem;
  display:flex;
  overflow:hidden;
  align-items:center;
  justify-content:center;
  .avathar{
    img{
      height:3rem;
      max-inline-size:100%;
    }
   }
   .username{
    h3{
      color:white;
    }
   }
   @media screen and (min-width:720px) and (max-width:1080px){
    gap:0.5rem;
    .username{
      h3{
        font-size:1rem;
      }
    }
  }
  @media screen and (min-width:360px) and (max-width:480px){
    gap:0.5rem;
    .username{
      h3{
        font-size:1rem;
      }
    }
  }
}
`;

export default Contacts
