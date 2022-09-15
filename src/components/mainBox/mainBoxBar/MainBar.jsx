import React from 'react';
import "./MainBar.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_SERVER_URL
let token = localStorage.getItem("accessToken")

const Mainbar = ({ datas }) => {
  const navigate = useNavigate()
  const enterRoom = async () => {
    try{
      const repo = await axios.get(url+`/room/${datas.sessionId}`,{headers:{"authorization":token}})
      console.log(repo)
      // navigate(`/room/${repo.data.data.sessionId}`,{state:{token:repo.data.data.token,sessionId:repo.data.data.sessionId,roomTitle:sendData.roomTitle}})
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
        <button onClick={enterRoom}>참여하기</button>
      </div>
    </div>
  );
}

export default Mainbar;
