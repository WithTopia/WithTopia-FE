import React, {useEffect, useState} from 'react';
import './MainSlide.scss'
import samplePic from "../../assets/profileSample.png";
import axios from 'axios';

const Mainslide = () => {
  const [ topRank, setTopRank ] = useState({
    nickname : "",
    profileImage : "",
    likeCnt : "",
  });
  const [ nickname, setNickname ] = useState('');
  const [ profileImage, setProfileImage ] = useState('');
  const [ likeCnt, setLikeCnt ] = useState('');

  const mainRank = async () => {
    try{
      const repo = await axios.get(`/top`)
      console.log(repo)
    }
    catch(error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    mainRank()
  },[])
  
  return (
    <>
      <div className='rank'>
        <div className='rank-top'>
          <div className='top-WithTo'>Today's WithTo</div>
          <div className='rank-wrap'>
            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div className='rank-text'>1등</div>
              <div className='rank-nick'>김근육</div>
            </div>
            {}
            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div className='rank-text'>2등</div>
              <div className='rank-nick'>서현웅</div>
            </div>

            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div className='rank-text'>3등</div>
              <div className='rank-nick'>김혜진</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainslide;
