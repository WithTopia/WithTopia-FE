import React, { useEffect, useState } from 'react';
import "./MainBoard.scss";
import detail1 from "../../assets/detail1.webp";
import detail2 from "../../assets/detail2.webp";
import detail3 from "../../assets/detail3.webp";
import detail4 from "../../assets/detail4.webp";
import detail5 from "../../assets/detail5.webp";
import Scrolltotop from '../button/scrollToTop';

const Mainboard = () => {
  const [tokenCheck,setTokenCheck] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("accessToken") === undefined || localStorage.getItem("accessToken") === null){
      setTokenCheck(false)
    }else{
      setTokenCheck(true)
    }
  },[])
  return (
    <div className='main-layout'>
      <div className='main-layout'>
        <img src={detail1} alt='' className='main1'/>
        <div className='main-btnlayout'>
          <a href={tokenCheck ? "/main" : "/login"}><button className='main-btn'>LOG IN</button></a>
        </div>
        <img src={detail2} alt='' className='main2'/>
        <img src={detail3} alt='' className='main2'/>
        <img src={detail4} alt='' className='main2'/>
        <img src={detail5} alt='' className='main2'/>
      </div>
      <Scrolltotop/>
    </div>
  );
}

export default Mainboard;
