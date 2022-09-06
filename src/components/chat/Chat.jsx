import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import "./Chat.scss"

var stompClient =null;
const url = process.env.REACT_APP_SERVER_URL2

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [roomLists, setRoomLists] = useState(); 
    // stompClient.debug= () => {};
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: '',
        messages:[]
    });
    const [message,setMessage] = useState("입장요")
    const [roomName,setRoomName] = useState("")
    const [roomId,setRoomId] = useState("")

    const createRooms = async () => {
        if (roomName===""){
            alert("방 제목을 입력해주세요.")
        }
        else{
            const repo = await axios.post(url+`/chat/room`,{name:roomName})
            setRoomId(repo.data.roomId)
            setUserData({...userData,connected: true});
            setRoomName("")
            subscribing()
        }     
    }
    const subscribing = () => {
        let content = {
            type:'ENTER',  
            roomId:roomId,
            sender:userData.username,
            message:message
        };
        stompClient.subscribe(url+'/topic/chat/room/'+roomId, JSON.stringify(content));
        // stompClient.subscribe(url+'/user/'+userData.username+'/private', onPrivateMessage);
    }
    const connect =()=>{
        setUserData({...userData,connected: true});
        let Sock = new SockJS(url);
        stompClient = over(Sock);
        // stompClient.connect({},()=>onConnected, onError);
    }
    const userJoin=()=>{
        let chatMessage = {
            type:'ENTER',  
            roomId:roomId,
            sender:userData.username
        };
        stompClient.send(url+"/app/chat/message", {}, JSON.stringify(chatMessage));
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
    const enterRoom = (id) => {
        let sender = prompt('대화명을 입력해주세요.');
        if(sender !== "") {
          localStorage.setItem('sender',sender);
          localStorage.setItem('roomId',id);
          window.location.href=url+"/chat/room/enter/"+roomId;
        }
    }
    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
        if (stompClient) {
            let chatMessage = {
                sender: userData.username,
                message: userData.message,
                type:"TALK",
                roomId:roomId
            };
            stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
            console.log(chatMessage,"success")
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
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
    useEffect(() => {
        connect()
    }, []);
    return (
    <div className="container">접속하기
        <button onClick={findRoom}>방 전체 불러오기</button>
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
    </div>
    )
}

export default ChatRoom