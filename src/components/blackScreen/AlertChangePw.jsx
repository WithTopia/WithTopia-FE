import React from 'react'
import "./AlertCreateRoom.scss"

const AlertChangePw = ({page,setPage}) => {
    const handleScreen = () => {
        setPage((prev)=>!prev)
    }
    const submitHandle = () => {

    }
    return(
    <div className='alert-change-pw'>
        <div className='create-container'>
        <div className='create-container-title'>비밀번호 변경</div>
        <form className='create-room-form' onSubmit={submitHandle}>
          <input placeholder=' ' type="text" className='room-input'></input>
          <input placeholder=' 방 제목' type="text" className='room-input'></input>
          <input placeholder=' 방 제목' type="text" className='room-input'></input>
          <input placeholder=' 방 제목' type="text" className='room-input'></input>
          <button>변경</button>
        </form>
      </div>
      <div className='black-out' onClick={handleScreen}></div>
    </div>
  )
}

export default AlertChangePw