import React from 'react'
import "./Report.scss"

const Report = ({setReport}) => {
    const handleReport = () => {
        setReport((prev)=>!prev)
    }
    return (
    <div className='report'>
        <div className='report-container'>
            <button className='report-close' onClick={handleReport}>X</button>
            <div className='report-box'>
                <label>유저 신고</label>
                <select>
                    <option value="">최대 인원수</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <input></input>
            </div>
        </div>
        {/* <div className='report-out' onClick={handleReport}></div> */}
    </div>
  )
}

export default Report