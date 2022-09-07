import React, { useEffect, useState } from 'react'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import "./Chat.scss"
import { useNavigate } from 'react-router-dom';
import ChatDetail from './ChatDetail';
import Cam from "../../assets/cam.png";
import Add from "../../assets/add.png";
import More from "../../assets/more.png";
import ChatBox from "../chatBox/ChatBox"
import ChatInputBox from "../chatInputBox/ChatInputBox"
import "./ChatDetail.scss"

var stompClient =null;
const url = process.env.REACT_APP_SERVER_URL2

const ChatRoom = () => {
    const navigate = useNavigate()
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [roomLists, setRoomLists] = useState(); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '바보',
        receivername: '',
        connected: false,
        message: '',
        messages:[]
    });
    const [message,setMessage] = useState("입장요")
    const [roomName,setRoomName] = useState("")
    const [roomId,setRoomId] = useState("")
    const [getMessages,setGetMessages] = useState([])
    const createRooms = async () => {
        if (roomName===""){
            alert("방 제목을 입력해주세요.")
        }
        else{
            const repo = await axios.post(url+`/chat/room`,{name:roomName})
            const id = String(repo.data.roomId)
            setRoomId(id)
            setUserData({...userData,connected: true});
            // navigate(`/chatdetail/${repo.data.roomId}`)
            setRoomName("")
            // subscribing()
        }     
    }
    const subscribing = (id) => {
        let content = {
            type:'ENTER',  
            roomId:id,
            sender:userData.username,
            message:message
        };
        console.log(content)
        stompClient.subscribe('/topic/chat/room/'+id, JSON.stringify(content));
    }

    const onMessageReceived = (payload)=>{
        // var payloadData = JSON.parse(payload);
        console.log("내용들",payload)
        // this.messages.unshift({
        //     "type":recv.type,"sender":recv.type=='ENTER'?'[알림]':recv.sender,"message":recv.message
        // })
        
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }
    const findRoom = async () => {
        const repo = await axios.get(url+'/chat/rooms')
        console.log(repo.data)
        setRoomLists(repo.data)
    }
    const onError = (err) => {
        console.log(err)
    }
    const enterRoom = async (id) => {
        const repo = await axios.get(url+`/chat/room/${id}`)
        console.log(repo)
        console.log("방접속")
        // navigate(`/chatdetail/${id}`)
        setUserData({...userData,connected: true});
        subscribing(id)
    }
    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendMessage = () =>{
        if (stompClient) {
            let chatMessage = {
                sender: userData.username,
                message: "폐하",
                type:"TALK",
                roomId:roomId
            };
            stompClient.send("/app/chat/message",{},JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
            console.log(chatMessage,"success")
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          let chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send(url+"/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(e)=>{
        const {value}=e.target;
        setUserData({...userData,"username": value});
    }
    const handleRoom = (e) => {
        setRoomName(e.target.value)
    }
    const connect =()=>{
        let Sock = new SockJS(url+"/ws/chat");
        stompClient = Stomp.over(Sock);
    }
    useEffect(() => {
        findRoom()
        connect()
    }, []);
    return (
        <>
        {userData.connected ? 
        <div className="chat">
            <div className="chatInfo">
                <span>조원영,서현웅...외 4명</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
                <button onClick={sendMessage}>클릭!</button>
                <ChatBox message={"massage"}></ChatBox>
                <ChatInputBox></ChatInputBox>
        </div> : 
        <div className="container">접속하기
            <div className="chat-box">
                <div className='container1'>
                    <h1>방 만들기</h1>
                    <input type="text" placeholder='방 제목' value={roomName} onChange={handleRoom}></input>
                    <button onClick={createRooms}>방파기</button>
                </div>
            </div>
            <ul>
                {roomLists && roomLists.map((lists,index)=>{
                    return(
                        <div key={index} className="room-list" onClick={()=>enterRoom(lists.roomId)}>
                            <li>{lists.roomName}</li>
                        </div>
                    )
                })}
            </ul>
        </div>}
        </>
    )
}

export default ChatRoom