import React from 'react';
import "./TopRanking.scss";

import crown from '../../assets/crown.png';
import crown2 from '../../assets/crown2.png';
import crown3 from '../../assets/crown3.png';
import crown4 from '../../assets/crown4.png';
import samplePic from "../../assets/profileSample.png";


const Topranking = () => {
  return (
    <>
      <div className='layout'>
        <div>
          <div className='rank-box'>
            <div className='rank-top3'>top 3</div>
            <hr/>
              <div className='rank-piece'>
                <img src={crown} alt="crown"/>1등
                <img src={samplePic} alt="profile" className='bar-profile-img'/>
                <div>nickName</div>
              </div>
              <div className='rank-piece'>
                <img src={crown2} alt="crown2"/>2등
                <img src={samplePic} alt="profile" className='bar-profile-img'/>
                <div>nickName</div>
              </div>
              <div className='rank-piece'>
                <img src={crown3} alt="crown3"/>3등
                <img src={samplePic} alt="profile" className='bar-profile-img'/>
                <div>nickName</div>
              </div>
              <div className='rank-piece'>
                <img src={crown4} alt="crown4"/>4등
                <img src={samplePic} alt="profile" className='bar-profile-img'/>
                <div>nickName</div>
              </div>
              <div className='rank-piece'>
                <img src={crown4} alt="crown4"/>4등
                <img src={samplePic} alt="profile" className='bar-profile-img'/>
                <div>nickName</div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topranking;
