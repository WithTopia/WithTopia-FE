import "./Report.scss"
import { useState } from "react"

const Report = ({setReport,nickname,nicknames}) => {
    console.log(nicknames)
    const [image,setImage] = useState("")
    const handleReport = () => {
        setReport((prev)=>!prev)
    }
    const onSelectFile = (e) => {
        const selectedFiles = e.target.files; 
        console.log(selectedFiles)
        // setImage(e.target.files[0])
    }
    return (
    <div className='report'>
        <div className='report-container'>
            <button className='report-close' onClick={handleReport}>X</button>
            <div className='report-box'>
                <h3 className='report-title'>유저 신고</h3>
                    <label>유저 선택</label>
                    <input
                        type="file"
                        onChange={onSelectFile}
                        accept="image/png , image/jpeg, image/webp"
                        className="file-input"></input>
                    <select>

                        <option value="">대상자를 선택하세요.</option>
                        {nicknames.map((name,index)=>{
                            return(
                                <option value={name} key={index}>{index}</option>
                            )
                        })}
                        {/* <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option> */}
                    </select>
                    <textarea></textarea>
                    <button>작성하기</button>
            </div>
        </div>
        {/* <div className='report-out' onClick={handleReport}></div> */}
    </div>
  )
}

export default Report