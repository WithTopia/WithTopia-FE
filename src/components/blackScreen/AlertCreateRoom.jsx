import React, { useState } from 'react'
import "./AlertCreateRoom.scss"
import MoveButton1 from '../button/MoveButton1'
import MoveButton2 from '../button/MoveButton2'

const AlertCreateRoom = ({pageOpen,setPageOpen}) => {
  const [check,unCheck] = useState(null)
  const handleScreen = () => {
    setPageOpen((prev)=>!prev)
  }
  const handleCheck = (e) => {
    const checkboxs = document.getElementsByClassName("checkbox")
    for(let i=0; i<checkboxs.length; i++){
      if(checkboxs[i] !== e){
        checkboxs[i].checked = false
        console.log(checkboxs)
      }
    }
    
  }
  const handlePointFalse = () => {
    unCheck(false)
  }
  const handlePointTrue = () => {
    unCheck(true)
  }
  console.log(check)
  return (
    <div className='alert-create-room'>
      <div className='create-container'>
        <div className='create-container-title'>방 만들기</div>
        <form className='create-room-form'>
          <input placeholder='방 제목' type="text" className='room-input'></input>
          <div className='checkbox-container'>
            <input type="radio" className='checkbox' onClick={handlePointTrue} onChange={(e)=>handleCheck(e.target)}></input>
            <label className='checkbox-label'>공개</label>
            <input type="radio" className='checkbox' onClick={handlePointFalse} onChange={(e)=>handleCheck(e.target)}></input>
            <label className='checkbox-label'>비공개</label>
          </div>
          <select>
            <option value="1" selected>최대 인원수</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <button className='create-room-btn'>네</button>
          <MoveButton2 text={"아니요"}></MoveButton2>
        </form>
      </div>
      <div className='black-out' onClick={handleScreen}></div>
    </div>
  )
}

export default AlertCreateRoom