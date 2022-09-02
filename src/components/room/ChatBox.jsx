import React from 'react';
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";

const Chatbox = () => {

    //진입 시 웹소켓 연결 및 해제
    // useEffect(() => {
    //     let sockJS = new SockJS('주소');
    //     stompClient = Stomp.over(sockJS);
    //     stompClient.debug = null;
    //     stompClient.connect(
    //     {
    //         Authorization: localStorage.getItem("accessToken")
    //     },
    //         (payload) => {
    //             stompClient.subscribe(`/sub/chat/room/${roomId}` + location[2], (data) => {
    //                 const newMessage = JSON.parse(data.body);
    //                 addMessage(newMessage);
    //             });
    //         },
    //         (err) => {
    //         });
    //     return function cleanup(payload) {
    //         stompClient.disconnect(payload);
    //     }
    // }, []);

    // const addMessage = (message) => {
    //     setContents((prev) => [...prev, message]);
    // };

    return (
        <div>
            <div>
                채팅내역박스
            </div>
            <div>
                <input 
                type="text"
                />                
            </div>
        </div>
    );
}

export default Chatbox;
