import React from 'react'
import logo from "../../assets/cutecat.jpg"
import "./Myinfo.scss"

const Myinfo = () => {
  return (
    <div className='myinfo'>
      <div className='info-container'>
        <div className='tier'>1티어</div>
        <div className='username'>현웅</div>
        <img src={logo} className="info-img"></img>
      </div>
    </div>
  )
}

export default Myinfo