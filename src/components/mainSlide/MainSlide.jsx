import React from 'react';
import './MainSlide.scss'
import samplePic from "../../assets/profileSample.png";

const Mainslide = () => {
  return (
    <>
      <div>
        <div>명예의 위토</div>
          <div className='rank-top'>
            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div>1등</div>
            </div>          
            

            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div>2등</div>
            </div> 
            

            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div>3등</div>
            </div> 
            
          </div>
      </div>
    </>
  );
}

export default Mainslide;
