
import React from 'react'
import "../assets/Global.scss"
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"
import SideBar from "../components/sideBar/SideBar"
import ChatList from '../components/chatList/ChatList'
import Mainslide from '../components/mainSlide/MainSlide'

const MainPage = () => {
  return (
    <div className='mainpage'>
      <Header/>
      <div className='layout'>
        <SideBar/>
        <div>
          <div className='main-rank'>
            <Mainslide></Mainslide>
          </div>
          <ChatList></ChatList>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MainPage

