import React, {useEffect, useState} from 'react';
import './MainSlide.scss'
import axios from 'axios';

const Mainslide = () => {
  const [ topRank, setTopRank ] = useState("");
  // const [ nickname, setNickname ] = useState('');
  // const [ profileImage, setProfileImage ] = useState('');
  // const [ likeCnt, setLikeCnt ] = useState('');

  const mainRank = async () => {
    try{
      const repo = await axios.get(`/top`)
      console.log(repo.data.data)
      setTopRank(repo.data.data)
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
          {topRank ? topRank.map((topRank,index)=>{
            return(
              <div className='rank-profile' key={index}>
                {index === 0 ? <><img src={topRank !== "" ? topRank.profileImage : null} alt='profile' className='rank-profile-img'/>
                              {/* <div className='rank-text'>{topRank.likeCnt}Pt</div> */}
                              <div className='rank-nick'>{topRank.nickname.split('_',1)}</div></> :
                index === 1 ? <><img src={topRank !== "" ? topRank.profileImage : null} alt='profile' className='rank-profile-img'/>
                              {/* <div className='rank-text'>{topRank.likeCnt}Pt</div> */}
                              <div className='rank-nick'>{topRank.nickname.split('_',1)}</div></> :
                index === 2 ? <><img src={topRank !== "" ? topRank.profileImage : null} alt='profile' className='rank-profile-img'/>
                              {/* <div className='rank-text'>{topRank.likeCnt}Pt</div> */}
                              <div className='rank-nick'>{topRank.nickname.split('_',1)}</div></> : null}
              </div> 
          )}) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainslide;
