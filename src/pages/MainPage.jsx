import React from 'react'
import "../assets/Global.scss"
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"
import SideBar from "../components/sideBar/SideBar"
import ChatList from '../components/chatList/ChatList'
import Test from '../components/test/Test'
import TopThree from '../components/topThree/TopThree'

const MainPage = () => {
  return (
    <div className='mainpage'>
      <Header/>
      <div className='layout'>
        <SideBar/>
        <div>
          <div className='main-rank'>
            <TopThree></TopThree>
          </div>
          <ChatList></ChatList>
          <Test></Test>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MainPage

