import React from 'react';
import styled from 'styled-components';

export default function Initial({user}) {
  return (
    <>
    <Container>
   <img src="https://media.tenor.com/0WkmuOC_W00AAAAi/waving-pikachu.gif" alt="hi" />
      <h1>
        Welcome,<span>{user?.username}!</span>
      </h1>
      <h3>Please select a chat to message</h3>
    </Container>
    </>
  )
}

const Container=styled.div`
   display:flex;
   flex-direction:column;
   overflow:auto;
    justify-content:center;
    align-items:center;
    color:white;
    img{
        height:20rem;
    }
    span{
        color:#82CD47;
    }
    @media screen and (min-width:720px) and (max-width:1080px){
      img{
        height:15rem;
      }
      h1{
        font-size:1.8rem;
        span{
         font-size:1.4rem;
     }
     }
     h3{
               font-size:1.4rem;
     }
    }
    @media screen and (min-width:360px) and (max-width:480px){
      img{
        height:10rem;
      }
      h1{
         font-size:1.5rem;
         span{
          font-size:1rem;
      }
      }
      h3{
          font-size:1rem;
      }

    }
`;