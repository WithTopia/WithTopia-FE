import React from 'react';
import "./MainBar.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Mainbar = ({ datas }) => {
  console.log(datas)
  const navigate = useNavigate()
  const enterRoom = async () => {
    let token = localStorage.getItem("accessToken")
    let refreshtoken = localStorage.getItem("refreshtoken")   
    try{
      const repo = await axios.post(`/room/${datas.sessionId}`,{password:""},{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      console.log(repo.data)
      navigate(`/room/${repo.data.data.sessionId}`,
      {state:{
        token:repo.data.data.enterRoomToken,
        sessionId:repo.data.data.sessionId,
        masterId:repo.data.data.nickname,
        roomTitle:datas.roomTitle,
        role:"user"
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
          {datas.roomMembers.map((member,index)=>{
            return(
              <img src={member.profileImage} key={index} className='bar-profile-img' alt='profile'></img>
            )
          })}
        </div>
        {datas.password === null ? <button onClick={enterRoom}>참여하기</button> : <div></div>}
        
      </div>
    </div>}
    </>
  );
}

export default Mainbar;
