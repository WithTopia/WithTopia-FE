import React from 'react';
import "./MainBar.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AlertInputPw from '../../blackScreen/AlertInputPw';
import { useState } from 'react';

const Mainbar = ({ datas }) => {
  let token = localStorage.getItem("accessToken")
  let refreshtoken = localStorage.getItem("refreshtoken")
  const [alertPwOn,alertPwOff] = useState(false)
  const navigate = useNavigate()

  const enterPw = () => {
    alertPwOff(true)
  }

  const enterRoom = async () => {
    try{
      const repo = await axios.post(`/room/${datas.sessionId}`,{password:""},{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      if(repo.data.errormessage==="사용자를 찾을 수 없습니다."){
        alert("로그인을 해주세요 !")
        navigate("/login")
        return
      }
      console.log(repo.data.data.roomMemberResponseDtoList[0].member)
      navigate(`/room/${repo.data.data.sessionId}`,
      {state:{
        token:repo.data.data.enterRoomToken,
        sessionId:repo.data.data.sessionId,        
        roomTitle:datas.roomTitle,
        memberId:repo.data.data.roomMemberResponseDtoList[0].member,
        role:"user"
      }})
    }
    catch(error){
      console.log(error)
      if(error.response.data.errormessage === "이미 입장한 멤버입니다."){
        alert("이미 입장한 멤버입니다.")
        return
      }
      if(error.response.data.errormessage === "방이 존재하지않습니다."){
        alert("방이 존재하지 않습니다.")
        return
      }
      if(error.response.data.errormessage === "방이 가득찼습니다."){
        alert("방이 가득찼습니다.")
        return
      }
    }
  }

  return (
    <>
    {datas.roomMembers.length === 0 ? null :
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
        {datas.password === "" ? <button onClick={enterRoom} className="access-btn">참여하기</button> : <button onClick={enterPw} className="access-btn">참여하기</button>}
        {alertPwOn ? <AlertInputPw alertPwOn={alertPwOn} alertPwOff={alertPwOff} token={token} refreshtoken={refreshtoken} datas={datas}></AlertInputPw> : null}
      </div>
    </div>}
    </>
  );
}

export default Mainbar;
