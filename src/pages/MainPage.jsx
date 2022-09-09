import React, { useState, useEffect } from 'react'
import axios from 'axios'

// import Myinfo from '../components/myinfo/Myinfo'
// import TopThree from "../components/topThree/TopThree"
// import ChatList from '../components/chatList/ChatList'
import "../assets/Global.scss"
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"
import SideBar from "../components/sideBar/SideBar"

const MainPage = () => {
  // const [chatRoom, setChatRoom] = useState([]);
  // const [page, setPage] = useState(1);

  // const getChatRoom = async () => {
  //   try{
  //     let chatPull = await axios.get(
  //       `https://주소를 넣어야하는데뭘넣는거지?/chatRoom?_page=${page}&_limit=6`
  //     );
  //     if(chatPull){
  //       setChatRoom([...chatRoom, ...chatPull.data]);
  //     }
  //   }catch (error) {
  //     console.log("error났다");
  //   }
  // };

  // useEffect(() => {
  //   getChatRoom();
  // },[]);

  return (
    <div className='default-page-size'>
      <Header></Header>
      {/* <div>mainPage :)
      <div>
        {chatRoom.map((room) => (
          <div>
            <h4>id: {room.id} </h4>
          </div>
        ))}
      </div>
        <div className='chat-room-bar'>
          채팅방 이름
          <button>참여하기</button>
        </div>
      </div> */}
      <SideBar></SideBar>
      <Footer></Footer>
    </div>
  )
}

export default MainPage

