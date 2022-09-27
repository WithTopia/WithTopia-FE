
import React, { useState } from 'react'
import "../assets/Global.scss"
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"
import SideBar from "../components/sideBar/SideBar"
import ChatList from '../components/chatList/ChatList'
import Mainslide from '../components/mainSlide/MainSlide'
import { useLocation } from 'react-router-dom'

const MainPage = () => {
  const location = useLocation()
  return (
    <div className='mainpage'>
      <Header/>
      <div className='layout'>
        <SideBar/>
        <div>
          <div className='main-rank'>
            <Mainslide></Mainslide>
          </div>
          <ChatList search={location.state === null ? null : location.state.search}></ChatList>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MainPage

