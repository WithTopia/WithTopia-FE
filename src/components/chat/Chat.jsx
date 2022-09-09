import React, { useEffect, useState } from 'react'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import ChatInputBox from "../chatInputBox/ChatInputBox"

var stompClient =null;
const url = process.env.REACT_APP_SERVER_URL2

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [roomLists, setRoomLists] = useState(); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: '',
        messages:[]
    });
    const [roomName,setRoomName] = useState("")
    const [roomId,setRoomId] = useState("")
    const [comment,setComment] = useState("")
    const createRooms = async () => {
        if (roomName===""){
            alert("방 제목을 입력해주세요.")
        }
        else{
            try{
                const repo = await axios.post(url+`/chat/room`,{name:roomName})
                const id = String(repo.data.roomId)
                setRoomId(id)
                setUserData({...userData,connected: true});
                setRoomName("")
                enterRoom(id)
            }
            catch(error){
                console.log(error)
            }
        }     
    }
    const submitName = () => {
        
    } 
    const subscribing = (id) => {
        // let content = {
        //     type:'ENTER',  
        //     roomId:id,
        //     sender:userData.username,
        //     message:"님이 입장하셨습니다."
        // };
        stompClient.subscribe('/topic/chat/'+id,function(frame){
            console.log("여기확인",JSON.parse(frame.body))
        });
    }

    const onMessageReceived = (id)=>{
        setComment(`${id}방에 ${userData.username} 님이 입장하셨습니다.`)
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
        setRoomId(id)
        // onMessageReceived(id)
        const repo = await axios.get(url+`/chat/room/${id}`)
        console.log(repo)
        setUserData({...userData,connected: true});
        // subscribing(id)
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
        stompClient.connect({},function(){
            subscribing(1)
        })
    }

    useEffect(() => {
        findRoom()
        connect()
    }, []);
    return (
        <>
        {userData.connected ? <ChatInputBox userData={userData} setUserData={setUserData} roomId={roomId} stompClient={stompClient}>
        </ChatInputBox> : 
        <div className="container">접속하기
            <div className="chat-box">
                <div className='container1'>
                    <h1>방 만들기</h1>
                    <input type="text" placeholder='방 제목' value={roomName} onChange={handleRoom}></input>
                    <input type="text" placeholder='유저명' value={userData.username} onChange={handleUsername}></input>
                    <button onClick={createRooms}>방파기</button>
                    <button>유저 저장</button>
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