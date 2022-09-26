import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AlertInputPw.scss"

const AlertInputPw = ({alertPwOn,alertPwOff,token,refreshtoken,datas}) => {
  const navigate = useNavigate()
  const [password,setPassword] = useState("")
  const submitPassword = async (e) => {
    e.preventDefault()
    try{
      const repo = await axios.post(`/room/${datas.sessionId}`,{password:password},{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      if(repo.data.errormessage==="사용자를 찾을 수 없습니다."){
        alert("로그인을 해주세요 !")
        console.log("??????????")
        navigate("/login")
        return
      }
      navigate(`/room/${repo.data.data.sessionId}`,
      {state:{
        token:repo.data.data.enterRoomToken,
        sessionId:repo.data.data.sessionId,
        masterId:repo.data.data.nickname,
        roomTitle:datas.roomTitle,
        role:"user"
      }})
    }
    catch(error){
      console.log(error)
      if(error.response.data.errormessage==="방이 존재하지않습니다."){
        alert("방이 존재하지 않습니다.")
        alertPwOff((prev)=>!prev)
      }
      if(error.response.data.errormessage==="비밀번호가 틀립니다."){
        alert("비밀번호가 틀립니다.")
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
        <form>
          <label>비밀번호 입력</label>
          <input placeholder=' 비밀번호' type="text" className='create-input' value={password} onChange={onChangePw}></input>
          <button onClick={handleScreen}>X</button>
          <button onClick={submitPassword}>입력하기</button>
        </form>
      </div>
      <div className='black-out' onClick={handleScreen}></div>
    </div>
  )
}

export default AlertInputPw