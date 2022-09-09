import ChatBox from "../chatBox/ChatBox";
import { useState } from "react";
import Attach from "../../assets/attach.png";
import Cam from "../../assets/cam.png";
import Add from "../../assets/add.png";
import More from "../../assets/more.png";
import naga from "../../assets/naga.png";
import axios from "axios";
import "./ChatInputBox.scss"

const url = process.env.REACT_APP_SERVER_URL2

const ChatInputBox = ({userData,setUserData,roomId,stompClient,except,getOut,setGetOut}) => { // 채팅 인풋 박스
  String(roomId)
  const [img, setImg] = useState(null);

  const handleOut = async () => { //나가기 , 나중에 delete 될 예정
    try{
      const repo = await axios.get(url+`/chat/room/${roomId}/exit`)
      console.log(repo)
      getOut.unsubscribe()
    }catch(error){
      console.log(error)
    }
  }

  const sendMessage = (e) =>{
    e.preventDefault()
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        message: userData.message,
        type:"TALK",
        roomId:roomId
      };
      stompClient.send(`/app/chat/${roomId}`,{},JSON.stringify(chatMessage));
      // setText(userData.message)
      // setUser(userData.username)
      setUserData({...userData,"message": ""});
    }
  }
  const handleMessage =(e)=>{
      const {value}= e.target;
      setUserData({...userData,"message": value});
  }
  return(
    <div className="chat">
      <div className="chatInfo">
        <span>조원영,서현웅...외 4명</span>
        <div className="chatIcons">
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" />
            <a href='/main' onClick={()=>handleOut} className="getout"><img className="naga" src={naga} alt=""/></a>
        </div>
      </div>
      <ChatBox userData={userData} except={except}></ChatBox>
      <div className="input">
          <input
              type="text"
              placeholder="Type something..."
              onChange={handleMessage}
              value={userData.message}
          />
          <div className="send">
              {/* <img src={Attach} alt="" /> */}
              <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
              />
              <label htmlFor="file">
              
              <img src={Attach} alt="" />
              </label>
              <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
  )
}
export default ChatInputBox