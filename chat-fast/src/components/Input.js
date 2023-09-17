import React,{useState} from 'react'
import styled from 'styled-components';
import EmojiPicker from "emoji-picker-react";
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

const Input = ({handlemsg}) => {
    const [showEmoji,setShowEmoji]=useState(false);
    const [msg,setMsg]=useState("");

    const handlehide=()=>{
         setShowEmoji(!showEmoji)
    }
    const handleEmojiClick=(e,emojiObject)=>{
      let message = msg;
      message += emojiObject.emoji;
      setMsg(message); 
    }
    const sendChat=(e)=>{
      e.preventDefault()
      if(msg.length>0){
        handlemsg(msg);
        setMsg("");
      }
    }
    
  return (
    <>
    <Container>
       <div className="button-container">
        <div className="emoji">
        <BsEmojiSmileFill onClick={handlehide} />
        {
            showEmoji&&<EmojiPicker onEmojiClick={handleEmojiClick}  />
        }
        </div>
       </div>
         <form className="input-container" onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='Send a Chat' value={msg} onChange={(e)=>setMsg(e.target.value)} />
            <button className="submit">
                <IoMdSend />
            </button>
         </form>
    </Container>
    </>
  )
}
const Container=styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  @media screen and (min-width: 360px) and (max-width: 480px) {
    padding: 0.3rem 0.5rem;
    svg {
      font-size: 0,5rem;
    }
    grid-template-columns:9% 91%;
}
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react{
        position: absolute;
        max-width: 300px;
        max-height: 360px;
        top: -380px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
}
.input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      } 
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #82CD47;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 0.3rem 1rem;
            svg {
              font-size: 1rem;
            }
        }
        @media screen and (min-width: 360px) and (max-width: 480px) {
          padding: 0.3rem 0.8rem;
          svg {
            font-size: 0.5rem;
          }
      }
        svg {
            font-size: 2rem;
            color: white;
        }
    }
}

`;

export default Input
