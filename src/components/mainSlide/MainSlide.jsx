import React, {useState} from 'react';
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
      const getTopRank = await repo.data.map((datas) => ({
        nickname : datas.nickname,
        profileImage : datas.profileImage,
        likeCnt : datas.likeCnt,
      }))
      setTopRank(topRank.concat(getTopRank))
      console.log('데이터::',topRank);
    }
    catch(error) {
      console.log(error)
    }
  };
  
  return (
    <>
      <div className='rank'>
        <div className='rank-top'>
          <div className='top-WithTo'>Today's WithTo</div>
          <div className='rank-wrap'>
            <div className='rank-profile'>
              <img src={samplePic} alt='profile' className='rank-profile-img'/>
              <div className='rank-text'>1등</div>
            </div>
            {}
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
