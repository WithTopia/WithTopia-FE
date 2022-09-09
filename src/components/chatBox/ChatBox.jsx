import React, { useEffect, useRef , useState } from "react";
import "../chatInputBox/ChatInputBox.scss"

const ChatBox = ({ user , text}) => {
  const [data , setData] = useState([])
  const [owner, setOwner] = useState(false)
  const ref = useRef();
  
  const update = {
    user:user,
    message:text
  }
  const chatUpdate = () => {
    setData([...data,update])
  }
  useEffect(()=>{
    if(text !== ""){
      chatUpdate()
    }else {
      setData([...data,{user:user,message:`${user} 님이 입장하셨습니다.`}])
    }
  }, [user,text]);
  return (
    <div className="messages">
      <div
        ref={ref}
        className={"message" + (owner ? " owner" : "")}>
        <div className="messageInfo">
        </div>
        <div className="messageContent">
          {data.map((datas,index)=>{
            return(
              <div key={index}>{user}
                <p>{datas.message}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;