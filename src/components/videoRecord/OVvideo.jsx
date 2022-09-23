import {useRef ,useEffect, useState} from 'react'
import like from "../../assets/like.png"
import unlike from "../../assets/unlike.png"
import "./VideoRecord.scss"
import axios from 'axios'
// import hiddenVideo from "../../assets/cam-off.png"

const OVvideo = ({streamManager,role}) => {
    const [vote,setVote] = useState(false)
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
                alert(req.data.errormessage)
            }
            console.log(req)
        }catch(error){
            console.log(error)
        }
    }
    const videoRef = useRef()
    useEffect(()=>{
        if (streamManager !== undefined && videoRef.current){
            streamManager.addVideoElement(videoRef.current)        
        }
    },[])
    return (
        <div className='video-content'>
            <div className='video-contents'>
                <h3 className='video-username'>{streamManager.stream.connection.data.split("%")[2]}</h3>
                <div className='video-likes'>
                    {/* {streamManager.stream.audioActive ? "마이크 킴" : "마이크 끔"} */}
                    <img src={like} alt="" onClick={handleVoteLike}></img>
                    <img src={unlike} alt="" onClick={handleVoteUnlike}></img>
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