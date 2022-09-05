// import React, { useEffect, useRef } from 'react';
// import './ChatBox.scss';
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

// // 채팅창에 필요한 요소 :: 룸id, nickname, 이전에 전송된 메시지들, 지금 전송한 메시지, 참여자
// // 참여자를 확인하기 위해 토큰,닉네임 가져오기
// // (채팅방 진입)소켓연결 - 서버와 포트번호로 커넥트 - 메시지 보내기 - 메시지 받기 - (채팅방 나가기)연결해제
// const Chatbox = () => {
//     // const ws = useRef();
//     // const navigate = useNavigate();
//     // const dispatch = useDispatch();
//     // const params = useParams();
//     // const roomId = params.id;
//     const scrollRef = useRef();

//     // //localstorage에서 token,nickname 가져오기
//     // const token = localStorage.getItem("accessToken");
//     // const nickname = localStorage.getItem("nickname");

//     // // 소켓 연결, unmount 시 소켓 연결 해제
//     // useEffect(() => {
//     //   wsConnect();
//     //   return () => {
//     //       wsDisConnect();
//     //   };
//     // }, []);

//     // //데이터 숨기기???
//     // stompClient.debug = null;

//     // //채팅방 이전 메시지 가져오기
//     // useEffect(() => {
//     //   const socket = new SockJS(`STOMP 서버가 구현되어 있는 URL/pub/message/${roomId}`);
//     //   stompClient.current = Stomp.over(socket);
    
//     // },[]);

//     //   // 방 입장 시 스크롤 아래로 이동
//     //   useEffect(() => {
//     //     scrollRef.current.scrollIntoView({ block: "end" });
//     // }, []);

//     // // 소켓 연결 함수(블루문)
//     // function wsConnect() {
//     //   try {
//     //       ws.current.debug = function (str) {};
//     //       ws.current.debug();
//     //       // type : "CHAT" 을 보내는 용도는 채팅방에 들어갈 때를 알기 위해서임
//     //       ws.current.connect({ token: token, type: "CHAT" }, () => {
//     //           // connect 이후 subscribe
//     //           ws.current.subscribe(`/sub/chat/message/${roomId}`, (response) => {
//     //               const newMessage = JSON.parse(response.body);
//     //               //subMessage=>chatSlice
//     //               dispatch(subMessage(newMessage));
//     //           });
//     //       });
//     //   } catch (error) {
//     //       console.log(error);
//     //   }
//     // }

//     // // 소켓 연결 해제
//     // function wsDisConnect() {
//     //   try {
//     //       ws.current.disconnect(() => {
//     //           ws.current.unsubscribe("sub-0");
//     //       });
//     //   } catch (error) {
//     //       console.log(error);
//     //   }
//     // }


//     return (
//         <div>
//             <div className='chatbox-layout'>
//                 채팅내역박스
//             </div>
//             <div className='chat-log' scrollRef={scrollRef} >
//               네모네모
//             </div>
//             <div>
//                 <input 
//                 type="text"
//                 />  
//                 <button>전송</button>              
//             </div>
//         </div>
//     );
// }

// export default Chatbox;
