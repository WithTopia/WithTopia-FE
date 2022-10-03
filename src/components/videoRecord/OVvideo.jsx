import {useRef ,useEffect, useState} from 'react'
import like from "../../assets/heart.png"
import unlike from "../../assets/broken-heart.png"
import plus from "../../assets/plus.png"
import minus from "../../assets/minus.png"
import { useDispatch } from "react-redux";
import { addNickName} from "../../redux/modules/banSlice";
import "./VideoRecord.scss"
import axios from 'axios'
import Swal from "sweetalert2"
// import ban from "../../assets/ban.png"
// import hiddenVideo from "../../assets/cam-off.png"

const OVvideo = ({streamManager,role,nicknames}) => {
    const [vote,setVote] = useState(null)
    const [complete,setComplete] = useState("")
    const dispatch = useDispatch();

    const checkVoted = () => {
        Swal.fire({title:"이미 투표 하셨습니다.",confirmButtonColor:"#FFD68B"})
    }
    const handleBan = () => {
        let nick = streamManager.stream.connection.data.split("%")[2]
        dispatch(addNickName(nick))
        // navigate("/room/:id",{state:{
        //     targetName:streamManager.stream.connection.data.split("%")[2]
        // }})
    }
    const handleVoteUnlike = () => {
        setVote(false)
        handleVote()
    }
    const handleVotelike = () => {
        setVote(true)
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
            console.log(vote)
            if(req.data.errormessage){
                Swal.fire({title:req.data.errormessage,confirmButtonColor:"#FFD68B"})
                return
            }
            if(req.data.statusMsg){
                setComplete("complete")
                Swal.fire({title:"인기도 투표 완료",confirmButtonColor:"#FFD68B"})
            }
            setVote(null)
        }catch(error){
            console.log(error)
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
                <h3 className='video-username'>{streamManager.stream.connection.data.split("%")[2].includes("_google_") ? streamManager.stream.connection.data.split("%")[2].split("_google_")[0] : streamManager.stream.connection.data.split("%")[2].includes("_kakao_") ? streamManager.stream.connection.data.split("%")[2].split("_kakao_")[0] : streamManager.stream.connection.data.split("%")[2]}</h3>
                <div className='video-likes'>
                    {/* {role === "master" ? <img src={ban} className="video-ban" onClick={handleBan}></img> : null} */}
                    {/* <img src={ban} className="video-ban" onClick={handleBan}></img> */}
                    {/* {streamManager.stream.audioActive ? "마이크 킴" : "마이크 끔"} */}
                    <img src={plus} alt="" className='plus'></img>
                    <img src={like} alt="" onClick={handleVotelike} className="heart1"></img>
                    <img src={minus} alt="" className='minus'></img>
                    <img src={unlike} alt="" onClick={handleVoteUnlike} className="heart2"></img>

                    {/* {complete === "" ? <>
                        <img src={likeYet} alt="" onClick={handleVoteLike}></img>
                        <img src={unlikeYet} alt="" onClick={handleVoteUnlike}></img></> : <>
                        <img src={like} alt="" onClick={checkVoted}></img>
                        <img src={unlike} alt="" onClick={checkVoted}></img></> } */}
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