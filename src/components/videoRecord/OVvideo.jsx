import {useRef ,useEffect, useState} from 'react'
import like from "../../assets/like.png"
import unlike from "../../assets/unlike.png"
import likeYet from "../../assets/yetlike.png"
import unlikeYet from "../../assets/yetunlike.png"
import { useDispatch } from "react-redux";
import { targetName ,addNickName} from "../../redux/modules/banSlice";
import "./VideoRecord.scss"
import axios from 'axios'
import ban from "../../assets/ban.png"
import Swal from "sweetalert2"
// import hiddenVideo from "../../assets/cam-off.png"

const OVvideo = ({streamManager,role,nicknames}) => {
    console.log(nicknames)
    const [vote,setVote] = useState(false)
    const [complete,setComplete] = useState("")
    const dispatch = useDispatch();

    const checkVoted = () => {
        Swal.fire({title:"이미 투표 하셨습니다.",confirmButtonColor:"#FFD68B"})
    }
    const handleBan = () => {
        console.log("working !")
        let nick = streamManager.stream.connection.data.split("%")[2]
        dispatch(addNickName(nick))
        // navigate("/room/:id",{state:{
        //     targetName:streamManager.stream.connection.data.split("%")[2]
        // }})
    }
    const handleVoteLike = (e) => {
        e.preventDefault()
        setVote(true)
        handleVote()
    }
    const handleVoteUnlike = (e) => {
        e.preventDefault()
        setVote(false)
        handleVote()
    }
    const handleVote = async () => {
        let nick = streamManager.stream.connection.data.split("%")[2]
        let token = localStorage.getItem("accessToken")
        let refreshtoken = localStorage.getItem("refreshtoken")
        try{
            const req = await axios.post("/vote",{
                nickname:nick,
                vote:vote
            },{headers:{"authorization":token,"refreshtoken":refreshtoken}})
            if(req.data.errormessage){
                Swal.fire({title:"자신에게 투표할 수 없습니다.",confirmButtonColor:"#FFD68B"})
                return
            }
            if(req.data.statusMsg){
                setComplete("complete")
                Swal.fire({title:"인기도 투표 완료",confirmButtonColor:"#FFD68B"})
            }
            console.log(req.data.statusMsg)
        }catch(error){
            if(error.response.data.errormessage==="더이상 내려갈 인기도가 없습니다."){
                Swal.fire({title:"더 이상 내려갈 인기도가 없습니다.",confirmButtonColor:"#FFD68B"})
            }
        }
    }
    const videoRef = useRef()
    useEffect(()=>{
        if (streamManager !== undefined && videoRef.current){
            streamManager.addVideoElement(videoRef.current)        
        }
    },[streamManager])
    return (
        <div className='video-content'>
            <div className='video-contents'>
                <h3 className='video-username'>{streamManager.stream.connection.data.split("%")[2]}</h3>
                <div className='video-likes'>
                    {/* {role === "master" ? <img src={ban} className="video-ban" onClick={handleBan}></img> : null} */}
                    {/* <img src={ban} className="video-ban" onClick={handleBan}></img> */}
                    {/* {streamManager.stream.audioActive ? "마이크 킴" : "마이크 끔"} */}
                    {complete === "" ? <>
                        <img src={likeYet} alt="" onClick={handleVoteLike}></img>
                        <img src={unlikeYet} alt="" onClick={handleVoteUnlike}></img></> : <>
                        <img src={like} alt="" onClick={checkVoted}></img>
                        <img src={unlike} alt="" onClick={checkVoted}></img></> }
                </div>
            </div>
            {/* {streamManager.stream.videoActive ? null : 
            <div className='video-hidden'>
                <img src={hiddenVideo} alt=""></img>
            </div>} */}
            <video ref={videoRef} autoPlay={true}  className="video-items"></video>
        </div>
    )
}

export default OVvideo
// muted={!streamManager.stream.audioActive} hidden={!streamManager.stream.videoActive}