import React, { useEffect, useState } from 'react'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import ChatInputBox from "../chatInputBox/ChatInputBox"

var stompClient = null;
let url = process.env.REACT_APP_SERVER_URL

const Chat = ({nickname,roomName,success,sessionId,setChat,checkMyScreen}) => {
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
    
    const subscribing = (sessionId) => {
        let content
        content = stompClient.subscribe('/topic/chat/'+sessionId,function(frame){
            setExcept(JSON.parse(frame.body))
        });
        stompClient.send("/sub/chat/"+sessionId,{},JSON.stringify({type:"ENTER",roomId:sessionId,sender:nickname}))
        setGetOut(content)
    }

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
                setGetOut={setGetOut}
                setChat={setChat}
                checkMyScreen={checkMyScreen}>
            </ChatInputBox>
        </>
    )
}

export default Chat