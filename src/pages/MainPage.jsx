import React from 'react'
import Header from '../components/header/Header'
import Myinfo from '../components/myinfo/Myinfo'
import TopThree from "../components/topThree/TopThree"
import ChatList from '../components/chatList/ChatList'

const MainPage = () => {
  return (
    <div className='main-page'>
      <Header></Header>
      <Myinfo></Myinfo>
      <TopThree></TopThree>
      <ChatList></ChatList>
    </div>
  )
}

export default MainPage