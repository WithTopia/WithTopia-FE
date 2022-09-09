import React, { useEffect, useRef , useState } from "react";
import "../chat/Chat.scss"
import axios from "axios";
// import "../chatInputBox/ChatInputBox.scss"

const url = process.env.REACT_APP_SERVER_URL2

const ChatBox = ({ userData, except }) => {
  const [data , setData] = useState([]) // 내가 친 채팅 및 유저관리
  const [exceptData,setExceptData] = useState([]) // 남이 친 채팅
  const [owner, setOwner] = useState(false)

  const ref = useRef();

  const update = {
    user:except.sender,
    message:except.message
  }
  
  const compare = () =>{
    if(userData.username === except.sender){
      setExceptData([...exceptData,update])
      setOwner(true)
    }else if(userData.message===""){
      console.log("반가워요")
    }else if(userData.username !== except.sender){
      setData([...exceptData,update])
      setOwner(false) // 여기까지함
    }
  }  

  useEffect(()=>{
    if(except === ""){
      console.log("nothing")
    }
    compare()
  },[except])

  return (
    <div className="messages">
      <div
        ref={ref}
        className={"message" + (owner ? " owner" : "")}>
        <div className="messageInfo">
        </div>
        <div className="messageContent">
          <div className="message-left">
            {exceptData.map((datas,index)=>{
            return(
              <div key={index}>{datas.user}
                <p>{datas.message}</p>
              </div>
            )
            })}
          </div>
          <div className="message-right">
            {exceptData.map((datas,index)=>{
            return(
              <div key={index}>{datas.user}
                <p>{datas.message}</p>
              </div>
            )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;