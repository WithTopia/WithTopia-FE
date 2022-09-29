import React, { useState } from 'react'
import "./AlertCreateRoom.scss"
import MoveButton2 from '../button/MoveButton2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AlertCreateRoom = ({pageOpen,setPageOpen}) => {
  const navigate = useNavigate()
  const [check,unCheck] = useState(null)
  const [sendData,setSendData] = useState({
    roomTitle:"",
    maxMember:"",
    password:"",
    status:""
  })

  const roomHandle = (e) => {
    e.preventDefault();
    setSendData({...sendData,roomTitle:e.target.value})
  }
  const handlePw = (e) => {
    e.preventDefault();
    if(check === null){
      alert("공개 여부를 선택해주세요.")
      return
    }
    
    setSendData({...sendData,password:e.target.value})
  }
  const handleScreen = () => {
    setPageOpen((prev)=>!prev)
  }
  const submitRoom = async (e) => {
    e.preventDefault()
    if(sendData.roomTitle==="" || sendData.maxMember==="" || sendData.status === null){
      alert("방 설정을 정확히 입력해주세요.")
      return
    }
    if(check === false){
      if(sendData.password.length < 4 || sendData.password.length > 12){
        alert("비밀번호는 영어문자,숫자로 4~12자리를 입력해주세요.")
        return
      }
    }
    try{
      let token = localStorage.getItem("accessToken")
      let refreshtoken = localStorage.getItem("refreshtoken")
      
      const repo = await axios.post("/create/room",{
        roomTitle:sendData.roomTitle,
        maxMember:sendData.maxMember,
        status:sendData.status,
        password:sendData.password
      },{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      if(repo.data.errormessage==="사용자를 찾을 수 없습니다."){
        alert("로그인을 해주세요 !")
        navigate("/login")
        return
      }
      localStorage.setItem("masterId",repo.data.data.masterId)
      
      navigate(`/room/${repo.data.data.sessionId}`,
      {state:{
        token:repo.data.data.token,
        sessionId:repo.data.data.sessionId,
        roomTitle:sendData.roomTitle,
        // memberId:repo.data.data.roomMemberResponseDtoList[0].member,
        role:"master"
      }})
    }catch(error){
      console.log(error)
      if(error){
        alert("로그인이 만료되었습니다.")
        navigate("/login")
        return
      }
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
    setSendData({...sendData,password:""})
    setSendData({...sendData,status:false})
    unCheck(false)
  }
  const handlePointTrue = () => {
    setSendData({...sendData,password:""})
    setSendData({...sendData,status:true})
    unCheck(true)
  }
  useEffect(()=>{
    console.log(check)
  },[check])
  
  return (
    <div className='alert-create-room'>
      <div className='create-container'>
        <div className='create-container-title'>방 생성</div>
        <form className='create-room-form'>
          <input placeholder=' 방 제목' type="text" className='create-input' value={sendData.roomTitle} onChange={roomHandle}></input>
          <div className='checkbox-container'>
            <input type="radio" className='checkbox' onClick={handlePointTrue} onChange={(e)=>handleCheck(e.target)}></input>
            <label className='checkbox-label'>공개</label>
            <input type="radio" className='checkbox' onClick={handlePointFalse} onChange={(e)=>handleCheck(e.target)}></input>
            <label className='checkbox-label'>비공개</label>
          </div>
          <input placeholder=' 비밀번호' type="password" className='create-input' value={sendData.password} onChange={handlePw} disabled={check}></input>
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