import React from 'react';
import "./MainBar.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_SERVER_URL

const Mainbar = ({ datas }) => {
  const navigate = useNavigate()
  const enterRoom = async () => {
    try{
      let token = localStorage.getItem("accessToken")
      let refreshtoken = localStorage.getItem("refreshtoken")
      const repo = await axios.get(url+`/room/${datas.sessionId}`,{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      console.log(repo.data)
      navigate(`/room/${repo.data.data.sessionId}`,
      {state:{
        token:repo.data.data.enterRoomToken,
        sessionId:repo.data.data.sessionId,
        masterId:repo.data.data.nickname,
        roomTitle:datas.roomTitle
      }})
    }
    catch(error){
      console.log(error)
    }     
  }

  return (
    <>
    {datas.status === false || datas.roomMembers.length === 0 ? null :
    <div className='chat-room-bar'>
      {datas.roomTitle}
      <div className='bar-info-group'>
        <div className='bar-count-user'>
          {datas.cntMember}/{datas.maxMember}
        </div>
        <div  className='bar-user-profile'>
          <img src={datas.roomMembers[0].profileImage} alt="profile" className='bar-profile-img'/>
        </div>
        <button onClick={enterRoom}>참여하기</button>
      </div>
    </div>}
    
    </>
  );
}

export default Mainbar;
