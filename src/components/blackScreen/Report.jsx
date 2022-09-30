import "./Report.scss"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const Report = ({setReport,nickname,nicknames}) => {
    let refreshtoken = localStorage.getItem("refreshtoken")
    let accessToken = localStorage.getItem("accessToken")

    const [image,setImage] = useState("")
    const [texts,setTexts] = useState("")
    const [name,setName] = useState("")

    const handleReport = () => {
        setReport((prev)=>!prev)
    }
    const onSelectFile = (e) => {
        const selectedFiles = e.target.files[0]; 
        setImage(selectedFiles)
    }

    const handleTexts = (e) => {
        setTexts(e.target.value)
    }
    const handleNickName = (e) => {
        setName(e.target.value)
    }
    const submitReport = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("content", texts);
        formData.append("toNickname", name);
        if(texts === "" || image===""){
            Swal.fire({title:"모든 내용을 정확히 입력해주세요.",confirmButtonColor:"#FFD68B"})
            return
        }
        try{
            const repo = await axios.post(`/report`,formData,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
            if(repo.data.statusMsg === "정상"){
                Swal.fire({title:"보내기 성공하였습니다.",confirmButtonColor:"#FFD68B"})
                setReport((prev)=>!prev)
                return
            }
            if(repo.data.errormessage === "자신을 신고할 수 없습니다."){
                Swal.fire("자신을 신고할 수 없습니다.")
            }

        }catch(error){
            if(error.errormessage==="사용자를 찾을 수 없습니다."){
                Swal.fire({title:"사용자를 찾을 수 없습니다. 재로그인 부탁드립니다.",confirmButtonColor:"#FFD68B"})
                return
            }
        }
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
                <select onChange={handleNickName} value={name}>
                    <option value="">대상자를 선택하세요.</option>
                    {nicknames.map((name,index)=>{
                        return(
                            <option value={name.nickname === nickname ? "" : name.nickname} key={index}>{name.nickname === nickname ? "" : name.nickname}</option>
                        )
                    })}
                </select>
                <textarea value={texts} placeholder="확증을 위해 스크린샷을 첨부해주세요." onChange={handleTexts}></textarea>
                <button onClick={submitReport}>작성하기</button>
            </div>
        </div>
        {/* <div className='report-out' onClick={handleReport}></div> */}
    </div>
  )
}

export default Report