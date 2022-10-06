import "./Report.scss"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import Loding from "../button/Loding"

const Report = ({setReport,nickname,nicknames}) => {
    const [image,setImage] = useState("")
    const [texts,setTexts] = useState("")
    const [name,setName] = useState("")
    const [loading,setLoading] = useState(false)

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
        setLoading(true)
        const formData = new FormData();
        formData.append("image", image);
        formData.append("content", texts);
        formData.append("toNickname", name);
        if(texts === "" || image===""){
            Swal.fire({title:"모든 내용을 정확히 입력해주세요.",confirmButtonColor:"#FFD68B"})
            return
        }
        if(image.type.includes("image")){
            console.log("이미지")
        }else{
            Swal.fire({title:"이미지를 선택해주세요.",confirmButtonColor:"#FFD68B"})
            return
        }
        try{
            let refreshtoken = localStorage.getItem("refreshtoken")
            let accessToken = localStorage.getItem("accessToken")
            const repo = await axios.post(`/report`,formData,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
            console.log(repo)
            
            if(repo.data.statusMsg === "정상"){
                Swal.fire({title:"보내기 성공하였습니다.",confirmButtonColor:"#FFD68B"})
                setLoading(false)
                // setReport((prev)=>!prev)
            }
            if(repo.data.errormessage){
                Swal.fire(repo.data.errormessage)
                setLoading(false)
            }

        }catch(error){
            if(error.errormessage==="사용자를 찾을 수 없습니다."){
                Swal.fire({title:"사용자를 찾을 수 없습니다.",confirmButtonColor:"#FFD68B"})
                setLoading(false)
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
                    accept="image/*" 
                    className="file-input"></input>
                <select onChange={handleNickName} value={name}>
                    <option value="">대상자를 선택하세요.</option>
                    {nicknames === undefined || null ? null : nicknames.map((name,index)=>{
                        return(
                            <option value={name.nickname} key={index}>{name.nickname}</option>
                        )
                    })}
                </select>
                <textarea value={texts} placeholder="확증을 위해 스크린샷을 첨부해주세요." onChange={handleTexts}></textarea>
                <button onClick={submitReport}>작성하기</button>
                {loading ? <Loding></Loding> : null}
            </div>
        </div>
        {/* <div className='report-out' onClick={handleReport}></div> */}
    </div>
  )
}

export default Report