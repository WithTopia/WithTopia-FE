import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Mainbar from '../components/mainBox/mainBoxBar/MainBar'
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
    <>
    <div className='main-rank'>

    </div>
      <div className='default-page-size'>
        <div className='main-page-title'>
          함께하는 위토피아!
        </div>
        {/* <div>
          {chatRoom.map((room) => (
            <div>
              <h4>id: {room.id} </h4>
            </div>
          ))}
        </div> */}
        <div>
          <Mainbar/>
          <Mainbar/>
          <Mainbar/>
          <Mainbar/>
          <Mainbar/>
          <Mainbar/>
        </div>
        <div>
          <button className='add-chatroom'>+</button>
        </div>
        
      </div>
    </>

  )
}

export default MainPage

