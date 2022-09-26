import React from 'react';
import "./MainBoard.scss";
import mainBoard1 from "../../assets/mainBoard1.png";
import mainBoard2 from "../../assets/mainBoard2.png";
import { useNavigate } from 'react-router-dom';

const Mainboard = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div className='main-layout'>
      <div className='main-layout'>
        <img src={mainBoard1} alt='' className='main'/>
        <div className='main-btnlayout'>
          <button className='main-btn' onClick={goToLogin}>LOG IN</button>
        </div>
        <img src={mainBoard2} alt='' className='main'/>
      </div>
    </div>
    
  );
}

export default Mainboard;
