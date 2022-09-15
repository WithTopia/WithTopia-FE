import React, { useState } from 'react'
import "./AlertCreateRoom.scss"
import MoveButton2 from '../button/MoveButton2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const url = process.env.REACT_APP_SERVER_URL
let token = localStorage.getItem("accessToken")

const AlertCreateRoom = ({pageOpen,setPageOpen}) => {
  const navigate = useNavigate()
  const [check,unCheck] = useState(null)
  const [sendData,setSendData] = useState({
    roomTitle:"",
    maxMember:"",
    status:""
  })
  const [getData,setGetData] = useState("")

  const roomHandle = (e) => {
    e.preventDefault();
    setSendData({...sendData,roomTitle:e.target.value})
  }
  const handleScreen = () => {
    setPageOpen((prev)=>!prev)
  }
  const submitRoom = async (e) => {
    e.preventDefault()
    if(sendData.roomTitle==="" || sendData.maxMember==="" || sendData.status === null){
      alert("방 설정을 정확히 입력해주세요.")
    }
    try{
      const repo = await axios.post(url+"/create/room",{
        roomTitle:sendData.roomTitle,
        maxMember:sendData.maxMember,
        status:sendData.status
      },{headers:{"authorization":token}})
      setGetData(repo.data.data)
      navigate(`/room/${repo.data.data.sessionId}`,{state:{token:repo.data.data.token,sessionId:repo.data.data.sessionId,roomTitle:sendData.roomTitle}})
    }catch(error){
      console.log(error)
    }
  }

  const handleCheck = (e) => {
    const checkboxs = document.getElementsByClassName("checkbox")
    for(let i=0; i<checkboxs.length; i++){
      if(checkboxs[i] !== e){
        checkboxs[i].checked = false
      }
    }
  }

  const handleNums = (e) => {
    e.preventDefault()
    setSendData({...sendData,maxMember:e.target.value})
  }
  const handlePointFalse = () => {
    setSendData({...sendData,status:false})
    unCheck(false)
  }
  const handlePointTrue = () => {
    setSendData({...sendData,status:true})
    unCheck(true)
  }
  
  return (
    <div className='alert-create-room'>
      <div className='create-container'>
        <div className='create-container-title'>방 생성</div>
        <form className='create-room-form'>
          <input placeholder=' 방 제목' type="text" className='room-input' value={sendData.roomTitle} onChange={roomHandle}></input>
          <div className='checkbox-container'>
            <input type="radio" className='checkbox' onClick={handlePointTrue} onChange={(e)=>handleCheck(e.target)}></input>
            <label className='checkbox-label'>공개</label>
            <input type="radio" className='checkbox' onClick={handlePointFalse} onChange={(e)=>handleCheck(e.target)}></input>
            <label className='checkbox-label'>비공개</label>
          </div>
          <select onChange={handleNums} value={sendData.maxMember}>
            <option value="">최대 인원수</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <button className='create-room-btn' onClick={submitRoom} type="submit">생성</button>
          <MoveButton2 text={"취소"}></MoveButton2>
        </form>
      </div>
      <div className='black-out' onClick={handleScreen}></div>
    </div>
  )
}

export default AlertCreateRoom