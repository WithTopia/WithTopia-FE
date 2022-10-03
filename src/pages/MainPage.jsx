
import React, { useState } from 'react'
import "../assets/Global.scss"
import Header from '../components/header/Header'
import SideBar from "../components/sideBar/SideBar"
import ChatList2 from '../components/chatList/ChatList2'
import Mainslide from '../components/mainSlide/MainSlide'

const MainPage = () => {
  return (
    <div className='mainpage'>
      <Header/>
      <div className='layout'>
        <SideBar/>
        <div className='group-right'>
          <div className='main-rank'>
            <Mainslide></Mainslide>
          </div>
          <ChatList2></ChatList2>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default MainPage

