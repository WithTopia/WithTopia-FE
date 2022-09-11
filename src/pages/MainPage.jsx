import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Mainbar from '../components/mainBox/mainBoxBar/MainBar'
import "../assets/Global.scss"
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"
import SideBar from "../components/sideBar/SideBar"
import AlertCreateRoom from '../components/blackScreen/AlertCreateRoom'

const MainPage = () => {
  // const [chatRoom, setChatRoom] = useState([]);
  const [page, setPage] = useState(false);

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
  const handlePage = () => {
    setPage((prev)=>!prev)
  }
  return (
    <div className='mainpage'>
    <Header/>
    <div className='layout'>
      <SideBar/>
      <div>
        <div className='main-rank'>
          랭킹받네
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
            <button className='add-chatroom' onClick={handlePage}>+</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    {page ? <AlertCreateRoom page={page} setPage={setPage}></AlertCreateRoom> : null}
    </div>
  )
}

export default MainPage

