import React, { useState } from 'react'
import logo from "../../assets/withtopia.png"
import MoveButton2 from '../button/MoveButton2'
import AlertCreateRoom from '../blackScreen/AlertCreateRoom'
import "./ChatList.scss"
import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL2

const ChatList = () => {
  const [data,setData] = useState()
  const [pageOpen,setPageOpen] = useState(false)

  const SetRooms = () => {
    // <ul>
    //   {roomLists && roomLists.map((lists,index)=>{
    //       return(
    //           <div key={index} className="room-list" onClick={()=>enterRoom(lists.roomId)}>
    //               <li>{lists.roomName}</li>
    //           </div>
    //       )
    //   })}
    // </ul>
  }
  
  const handleScreen = () => {
    setPageOpen((prev)=>!prev)
  }
  const findRoom = async () => {
    const repo = await axios.get(url+'/chat/rooms')
    console.log(repo.data)
    setData(repo.data)
  }
  useEffect(()=>{
    findRoom()
  },[])
  return (
    <div>
      <div className='chat-list-text-content'>
        <div className='chat-list-text'>함께 해요,</div>
        <img src={logo} className="withtopia"></img>
      </div>
      <div className='chat-list'>
        <div className='chat-list-container'>
          <div className='chat-list-text2'>
            <div className='chat-text1'>지금 활동중인 위토들</div>
            <div onClick={handleScreen} className="chat-text2"><MoveButton2 text={"방 생성"}></MoveButton2></div>
          </div>
          {data.map((datas,index)=>{
            return(
              <div key={index} className='chat-item-lists'>
                <a href='/main' className='chat-list-content'>
                  <div className='chat-list-content-title'>
                    채팅방 {datas}
                  </div>
                  <div className='chat-list-content-right'>
                    <MoveButton2 text={"4명/6명"}></MoveButton2>
                    <button className='chat-btn2'>참여하기</button>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
      {pageOpen === true ? <AlertCreateRoom pageOpen={pageOpen} setPageOpen={setPageOpen}></AlertCreateRoom> : null}
    </div>
  )
}

export default ChatList;