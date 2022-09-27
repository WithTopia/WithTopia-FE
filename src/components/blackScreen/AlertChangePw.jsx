import axios from 'axios'
import React, { useState } from 'react'
import "./AlertChangePw.scss"
import {useNavigate} from "react-router-dom"

const AlertChangePw = ({page,setPage}) => {
  const navigate = useNavigate()
  let token = localStorage.getItem("accessToken")
  let refreshtoken = localStorage.getItem("refreshtoken")
  const [password,setPassword] = useState({
    origin:"",
    newPassword:"",
    newPasswordConfirm:""
  })
  const handleScreen = () => {
      setPage((prev)=>!prev)
  }
  const submitHandle = async (e) => {
    e.preventDefault()
    try{
      console.log(password)
      const repo = await axios.put("/member/mypage/changepw",{
      origin:password.origin,
      password:password.newPassword,
      passwordConfirm:password.newPasswordConfirm
    },{headers:{"authorization":token,"refreshtoken":refreshtoken}})
    console.log(repo)
    if(repo.data.statusMsg === "정상"){
      alert("변경 되었습니다.")
      navigate("/main")
      return
    }
    }catch(error){
      if(error.response.data.errormessage ==="패스워드가 일치하지않습니다."){
        alert("패스워드가 일치하지 않습니다.")
      }
    }
  }
  const handlePassword = (e) => {
    setPassword({...password,origin:e.target.value})
  }
  const handlePassword2 = (e) => {
    setPassword({...password,newPassword:e.target.value})
  }
  const handlePassword3 = (e) => {
    setPassword({...password,newPasswordConfirm:e.target.value})
  }
  return(
    <div className='alert-change-pw'>
        <div className='change-pw'>
        <div className='change-pw-title'>비밀번호 변경</div>
        <form className='change-pw-form'>
          <input placeholder=' 기존 비밀번호' type="password" className='change-password-input' value={password.origin} onChange={handlePassword}></input>
          <input placeholder=' 변경할 비밀번호' type="password" className='change-password-input' value={password.newPassword} onChange={handlePassword2}></input>
          <input placeholder=' 비밀번호 확인' type="password" className='change-password-input' value={password.newPasswordConfirm} onChange={handlePassword3}></input>
          <button className='change-pw-btn' onClick={submitHandle}>변경</button>
        </form>
      </div>
      <div className='modal-out' onClick={handleScreen}></div>
    </div>
  )
}

export default AlertChangePw