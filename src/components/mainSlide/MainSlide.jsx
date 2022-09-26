import React from 'react';
import './MainSlide.scss'
import samplePic from "../../assets/profileSample.png";

const Mainslide = () => {
  return (
    <>
      <div className='rank'>
        <div className='rank-top'>
          <div className='top-WithTo'>Today's WitTo</div>
          <div className='rank-wrap'>
            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div className='rank-text'>1등</div>
            </div>

            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div className='rank-text'>2등</div>
            </div>

            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div className='rank-text'>3등</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainslide;
