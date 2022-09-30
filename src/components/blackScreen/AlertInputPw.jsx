import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AlertInputPw.scss"
import Swal from "sweetalert2"

const AlertInputPw = ({alertPwOn,alertPwOff,token,refreshtoken,datas}) => {
  const navigate = useNavigate()
  const [password,setPassword] = useState("")
  const submitPassword = async (e) => {
    e.preventDefault()
    try{
      console.log(datas)
      const repo = await axios.post(`/room/${datas.sessionId}`,{password:password},{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      if(repo.data.errormessage === "Token이 유효하지 않습니다."){
        Swal.fire("로그인을 해주세요.")
      }
      if(repo.data.errormessage==="사용자를 찾을 수 없습니다."){
        Swal.fire("로그인을 해주세요.")
        console.log("??????????")
        navigate("/login")
        return
      }
      navigate(`/room/${repo.data.data.sessionId}`,
      {state:{
        token:repo.data.data.enterRoomToken,
        sessionId:repo.data.data.sessionId,
        roomTitle:datas.roomTitle,
        role:"user"
      }})
    }
    catch(error){
      console.log(error)
      if(error.response.data.errormessage === "방이 존재하지않습니다."){
        Swal.fire("방이 존재하지 않습니다.")
        alertPwOff((prev)=>!prev)
      }
      if(error.response.data.errormessage === "비밀번호가 틀립니다."){
        Swal.fire("비밀번호가 틀립니다.")
      }
      if(error.response.data.errormessage === "이미 입장한 멤버입니다."){
        Swal.fire("이미 입장한 멤버입니다.")
      }
    }     
  }

  const onChangePw = (e) => {
    setPassword(e.target.value)
  }
  const handleScreen = () => {
    alertPwOff((prev)=>!prev)
  }
  return (
    <div className='alertInputpw'>
      <div className='input-pw'>
        <button onClick={handleScreen} className="input-password-close">X</button>
        <form className='password-form'>
          <span className='form-notice'>비밀번호가 존재합니다.</span>
          <div className='input-password-form'>
          
            <input placeholder='비밀번호' type="password" className='create-input' value={password} onChange={onChangePw}></input>
            <button onClick={submitPassword} className="input-password-btn">입력하기</button>
          </div>
        </form>
      </div>
      <div className='black-out' onClick={handleScreen}></div>
    </div>
  )
}

export default AlertInputPw