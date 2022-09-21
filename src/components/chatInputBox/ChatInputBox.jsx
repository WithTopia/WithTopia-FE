import ChatBox from "../chatBox/ChatBox";
import { useState ,useEffect } from "react";
import axios from "axios";
import close from "../../assets/x.png"
import send from "../../assets/Vector.png"

const url = process.env.REACT_APP_SERVER_URL

const ChatInputBox = ({userData,setUserData,roomId,stompClient,except,getOut,setGetOut}) => { // 채팅 인풋 박스
  String(roomId)
  const [img, setImg] = useState(null);
  const [data , setData] = useState([]) // 내가 친 채팅 및 유저관리

  const update = {
    user:except.sender,
    message:except.message
  }

  const handleOut = async () => { //나가기 , 나중에 delete 될 예정
    try{
      const repo = await axios.put(url+`/chat/room/${roomId}/exit`)
      console.log(repo)
      // getOut.unsubscribe()
      stompClient.disconnect({},function(){
        console.log('연결 해제.')
      })
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
  useEffect(()=>{
    if(except.message === ""){
      console.log("nothing")
    }else{
      setData([...data,update]) 
    }
    
  },[except])
  console.log(except)
  return(
    <div className="chat">
      <div className="chatInfo">
        <span>
          Chat
        </span>
        <div className="chatIcons">
          <img className="naga" src={close} alt=""/>
        </div>
      </div>
      <div className="messages">
        {data.map((data, index)=>(
          <ChatBox data={data} userData={userData} key={index}></ChatBox>
        ))}
      </div>
      <div className="input">
        <input
            type="text"
            placeholder="Type something..."
            onChange={handleMessage}
            value={userData.message}
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