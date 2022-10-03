import React from 'react'
import "./FindContainer.scss"

const FindContainer = () => {
  const handleContainer = () => {
    
  }
  return (
    <div className='find-container'>
      <form onSubmit={handleContainer} className="find-form">
        <label>이메일 인증 확인</label>
        <input placeholder="email"></input>
        <div className='confirm-code'>
          <input placeholder="confirm"></input>
          <button className="confirm-btn">인증번호 확인</button>
        </div>
        <label>새 비밀번호 입력</label>
        <input placeholder="New Password"></input>
        <label>새 비밀번호 확인</label>
        <input placeholder="New Password Confirm"></input>
        <button>변경 완료</button>
      </form>
    </div>
  )
}

export default FindContainer