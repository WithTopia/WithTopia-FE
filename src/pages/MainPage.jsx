import React from 'react'
import Myinfo from '../components/myinfo/Myinfo'
import TopThree from "../components/topThree/TopThree"
import ChatList from '../components/chatList/ChatList'
import "../assets/Global.scss"
import Footer from '../footer/Footer'

const MainPage = () => {
  return (
    <div className='main-page'>
      <div className='main-content'>
        <div className='main-content-left'>
          <Myinfo></Myinfo>
          <div style={{marginLeft:"31px",marginBottom:"6px",fontSize:"23px",fontWeight:"bold"}}>{67}명의 위토들과 함께 하고 있습니다.</div>
          <TopThree></TopThree>
        </div>
        <div className='main-content-right'>
          <ChatList></ChatList>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default MainPage