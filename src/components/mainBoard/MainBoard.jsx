import React from 'react';
import "./MainBoard.scss";
import detail1 from "../../assets/detail1.png";
import detail2 from "../../assets/detail2.png";
import { useNavigate } from 'react-router-dom';
import Scrolltotop from '../button/scrollToTop';

const Mainboard = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div className='main-layout'>
      <div className='main-layout'>
        <img src={detail1} alt='' className='main1'/>
        <div className='main-btnlayout'>
          <button className='main-btn' onClick={goToLogin}>LOG IN</button>
        </div>
        <img src={detail2} alt='' className='main2'/>
      </div>
      <Scrolltotop/>
    </div>
  );
}

export default Mainboard;
