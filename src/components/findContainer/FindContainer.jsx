import React from 'react'
import "./FindContainer.scss"

const FindContainer = () => {
  const handleContainer = () => {
    console.log("응애")
  }
  return (
    <div className='find-container'>
      <form onSubmit={handleContainer}>
        <label>이메일</label>
        <input placeholder="email"></input>
        <label>인증 확인</label>
        <input placeholder="email"></input>
        <button className="confirm-btn">인증확인</button>
        <label>새 비밀번호 입력</label>
        <input placeholder="email"></input>
        <label>새 비밀번호 확인</label>
        <input placeholder="email"></input>
        <button>변경 완료</button>
      </form>
    </div>
  )
}

export default FindContainer