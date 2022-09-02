import React from 'react'
import logo from "../../assets/cutecat.jpg"
import logo2 from "../../assets/crown4.png"
import MoveButton1 from '../button/MoveButton1'
import "./Myinfo.scss"

const Myinfo = () => {
  return (
    <div className='myinfo'>
      <div className='info-container'>
        <img src={logo} className="info-img"></img>
        <div className='info-content'>
          {/* <div className='tier'>1티어</div> */}
          <div className='username'><img src={logo2}></img>서현웅</div>
          <a href='/profile'><MoveButton1 text={"마이페이지"}></MoveButton1></a>
          <a><MoveButton1 text={"로그아웃"}></MoveButton1></a>
        </div>
      </div>
    </div>
  )
}

export default Myinfo