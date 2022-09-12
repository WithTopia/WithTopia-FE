import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../assets/Global.scss"
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"
import SideBar from "../components/sideBar/SideBar"
import ChatList from '../components/chatList/ChatList'
import Test from '../components/test/Test'

const MainPage = () => {
  // const [chatRoom, setChatRoom] = useState([]);


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
    <div className='mainpage'>
    <Header/>
    <Test></Test>
    <div className='layout'>
      <SideBar/>
      <div>
        <div className='main-rank'>
          랭킹받네
        </div>
        <ChatList></ChatList>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default MainPage

