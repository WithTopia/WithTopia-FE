import React from 'react';
import "./MainBar.scss"
import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL

const Mainbar = ({ datas }) => {
  console.log(datas)
  const enterRoom = async () => {
    try{
      const repo = await axios.get(url+`/room/${datas.sessionId}`)
      console.log(repo)
      // return repo
    }
    catch(error){
      console.log(error)
    }
        
  }
  return (
    <div className='chat-room-bar'>
      {datas.roomTitle}
      <div className='bar-info-group'>
        <div className='bar-count-user'>
          {datas.cntMember}/{datas.maxMember}
        </div>
        <div  className='bar-user-profile'>
          <img src={datas.roomMembers[0].profileImage} alt="profile" className='bar-profile-img'/>
        </div>
        {/* <a href={`/room/${datas.sessionId}`}></a> */}
        <button onClick={enterRoom}>참여하기</button>
      </div>
    </div>
  );
}

export default Mainbar;
