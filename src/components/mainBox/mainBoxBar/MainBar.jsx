import React from 'react';
import samplePic from "../../../assets/profileSample.png";
import "./MainBar.scss"

const Mainbar = () => {
  return (
    <div>
      <div>
        <div className='chat-room-bar'>
          채팅방 이름
          <div className='bar-info-group'>
            <div className='bar-count-user'>
              4/6
            </div>
            <div  className='bar-user-profile'>
              <img src={samplePic} alt="profile" className='bar-profile-img'/>
            </div>
            <button>참여하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainbar;
