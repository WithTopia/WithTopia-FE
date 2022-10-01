import ChatBox from "../chatBox/ChatBox";
import { useState ,useEffect } from "react";
import axios from "axios";
import close from "../../assets/x.png"
import send from "../../assets/Vector.png"
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { addNickName } from "../../redux/modules/banSlice"
import Swal from "sweetalert2"

const ChatInputBox = ({userData,setUserData,roomId,stompClient,except,setChat,checkMyScreen,nicknames}) => { // 채팅 인풋 박스
  const tName = useSelector(addNickName)
  const [img, setImg] = useState(null);
  const [data , setData] = useState([]) // 내가 친 채팅 및 유저관리
  const [targetName,setTargetName] = useState("") //tName.payload.banSlice.targetName
  const location = useLocation()
  const navigate = useNavigate()

  const update = {
    user:except.sender,
    message:except.message
  }
  // 나가기
  const handleOut = () => {
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
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        type:"BEN",
        roomId:roomId,
        receive:tName.payload.banSlice.targetName
      };
      stompClient.send(`/sub/chat/${roomId}`,{},JSON.stringify(chatMessage));
      setUserData({...userData,"message": ""});
      if(tName.payload.banSlice.targetName === localStorage.getItem("nickname")){
        Swal.fire({title:"추방 당하셨습니다.",confirmButtonColor:"#FFD68B"})
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
      if(e.nativeEvent.isComposing === false){
        sendMessage()
      }
    }
  }

  // useEffect(()=>{
  //   if(tName.payload.banSlice.targetName !== ""){
  //     if(tName.payload.banSlice.targetName === localStorage.getItem("nickname")){
  //       Swal.fire({title:"방장은 추방될 수 없습니다.",confirmButtonColor:"#FFD68B"})
  //       return
  //     }
  //     else{
  //       kickMessage()
  //       handleOut()
  //     }
  //   }
  // },[tName])

  useEffect(()=>{
    if(checkMyScreen === false){
      handleOut()
    }
  },[])
  useEffect(()=>{
    if(except.message === ""){
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
            // onKeyPress={handleEnter}
        />
          <div className="send">
            <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
            />
            <img src={send} onClick={sendMessage}></img>
          </div>
        </div>
      </div>
  )
}
export default ChatInputBox