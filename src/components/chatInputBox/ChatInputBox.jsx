import ChatBox from "../chatBox/ChatBox";
import { useState ,useEffect } from "react";
import axios from "axios";
import close from "../../assets/x.png"
import send from "../../assets/Vector.png"
import { useNavigate, useLocation } from "react-router-dom";

const ChatInputBox = ({userData,setUserData,roomId,stompClient,except,setChat,checkMyScreen,nicknames}) => { // 채팅 인풋 박스
  const [img, setImg] = useState(null);
  const [data , setData] = useState([]) // 내가 친 채팅 및 유저관리
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.state.banAuth)
  console.log(location.state.targetName)
  const update = {
    user:except.sender,
    message:except.message
  }
  // 나가기
  const handleOut = () => {
    console.log("사실 디스커넥트를 안하고 있었던거라면 ?")
    stompClient.unsubscribe("sub-0")
    if(stompClient){
      let chatMessage = {
        sender: userData.username,
        type:"EXIT",
        roomId:roomId
      };
      stompClient.send(`/sub/chat/${roomId}`,{},JSON.stringify(chatMessage))
      setUserData({...userData,"message": ""});
    }
    try{
      stompClient.disconnect(()=>{   
      })
    }catch(error){
      console.log(error)
    }
  }

  const sendMessage = () =>{
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        message: userData.message,
        type:"TALK",
        roomId:roomId
      };
      stompClient.send(`/sub/chat/${roomId}`,{},JSON.stringify(chatMessage));
      setUserData({...userData,"message": ""});
    }
  }

  const kickMessage = () =>{
    alert(roomId)
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        type:"BEN",
        roomId:roomId,
        receive:location.state.targetName
      };
      stompClient.send(`/sub/chat/${roomId}`,{},JSON.stringify(chatMessage));
      // setText(userData.message)
      // setUser(userData.username)
      setUserData({...userData,"message": ""});
      if(location.state.targetName === localStorage.getItem("nickname")){
        handleOut()
        alert("추방 당하셨습니다.")
        navigate("/main")
        return
      }
    }
  }

  const handleChat = () =>{
    setChat((prev)=>!prev)
  }
  const handleMessage =(e)=>{
    const {value}= e.target;
    setUserData({...userData,"message": value});
  }
  const handleEnter = (e) =>{
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  useEffect(()=>{
    kickMessage()
  },[location.state.targetName])

  useEffect(()=>{
    if(checkMyScreen === false){
      handleOut()
    }
  },[])
  useEffect(()=>{
    if(except.message === ""){
      console.log("nothing")
    }else{
      setData([...data,update]) 
    }
  },[except])  
  return(
    <div className="chat">
      <div className="chatInfo-box">
        <span>
          Chat
        </span>
        <div className="chatIcons">
          <img className="naga" src={close} alt="" onClick={handleChat}/>
        </div>
      </div>
      <div className="messages">
        {data.map((data, index)=>(
          <ChatBox data={data} userData={userData} key={index}></ChatBox>
        ))}
      </div>
      <div className="input-box">
        <input
            type="text"
            placeholder="Type something..."
            onChange={handleMessage}
            value={userData.message}
            onKeyDown={handleEnter}
        />
          <div className="send">
            <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
            />
            {/* <label htmlFor="file">
            <img src={Attach} alt="" />
            </label> */}
            <img src={send} onClick={sendMessage}></img>
          </div>
        </div>
      </div>
  )
}
export default ChatInputBox