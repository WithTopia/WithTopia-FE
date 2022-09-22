import React, { useEffect, useState } from 'react'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import ChatInputBox from "../chatInputBox/ChatInputBox"

var stompClient = null;
const url = process.env.REACT_APP_SERVER_URL

const Chat = ({nickname,roomName,success,sessionId,setChat}) => {
    let token = localStorage.getItem("accessToken")
    const [except,setExcept] = useState("")    
    const [getOut,setGetOut] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: nickname,
        connected: false,
        message: '',
        messages:[],
        roomName:roomName
    });
    // const createRooms = async () => {
    //     try{
    //         const repo = await axios.post(url+`/create/room`,{name:roomName},{"Authorization":token})
    //         const id = String(repo.data.roomId)
    //         setRoomId(id)
    //         setUserData({...userData,connected: true});
    //         enterRoom(id)
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // } 
    
    const subscribing = (sessionId) => {
        let content
        content = stompClient.subscribe('/topic/chat/'+sessionId,function(frame){
            setExcept(JSON.parse(frame.body))
        });
        setGetOut(content)
    }

    // const onMessageReceived = (id)=>{
    //     setComment(`${id}방에 ${userData.username} 님이 입장하셨습니다.`)
    // }
    
    // const enterRoom = async (id) => {
    //     setRoomId(id)        
    //     const repo = await axios.get(url+`/chat/room/${id}`)
    //     console.log(repo)
    //     setUserData({...userData,connected: true});
    //     subscribing(id)
    // }

    const connect =()=>{
        let Sock = new SockJS(url+"/wss");
        stompClient = Stomp.over(Sock);
        stompClient.connect({
            "Authorization":token
        },function(){
            subscribing(sessionId)
        })
        
    }

    useEffect(() => {
        if(success === true){
            connect()
            console.log("연결 함 ..")
        }
        else{
            console.log("연결 중 ...")
        }
    }, []);
    return (
        <>
            <ChatInputBox
                userData={userData}
                setUserData={setUserData}
                roomId={sessionId}
                stompClient={stompClient}
                except={except}
                getOut={getOut}
                setGetOut={setGetOut}
                setChat={setChat}>
            </ChatInputBox>
        </>
    )
}

export default Chat