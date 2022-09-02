import React, { useState } from 'react'
import "./Header.scss"
import logo from "../../assets/react.png"
import {useNavigate } from "react-router-dom"
import AlertCreateRoom from '../blackScreen/AlertCreateRoom'

const Header = () => {
  const navigate = useNavigate()
  const [pageOpen,setPageOpen] = useState(false)
  const handleScreen = () => {
    setPageOpen((prev)=>!prev)
  }
  return (
    <div className='header'>
      <div className='header-container'>
        <div className='haeder-left'>
          <img src={logo} alt="" className='header-logo'></img>
        </div>
        <div className='haeder-right'>
          <ul>
            <li className="items">
              <div onClick={handleScreen} className="items-link">방 생성하기</div>
            </li>
            <li className="items">
              <a href={"/profile"} className="items-link">My Page</a>
            </li>
            <li className="items">
              <a href={"/main"} className="items-link">LogOut</a>
            </li>
          </ul>
        </div>
      </div>
      {pageOpen === true ? <AlertCreateRoom pageOpen={pageOpen} setPageOpen={setPageOpen}></AlertCreateRoom> : null}
    </div>
  )
}

export default Header