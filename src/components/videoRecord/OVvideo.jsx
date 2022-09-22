import {useRef ,useEffect, useState} from 'react'
import hiddenVideo from "../../assets/cam-off.png"
import like from "../../assets/like.png"
import unlike from "../../assets/unlike.png"
import "./VideoRecord.scss"

const OVvideo = ({streamManager,role}) => {
    const videoRef = useRef()
    useEffect(()=>{
        if (streamManager !== undefined && videoRef.current){
            streamManager.addVideoElement(videoRef.current)        
        }
      },[])
    return (
        <div className='video-content'>
            <div className='video-contents'>
                <h3 className='video-username'>{streamManager.stream.connection.data.substr(-2)}</h3>
                <div className='video-likes'>
                    {streamManager.stream.audioActive ? "마이크 킴" : "마이크 끔"}
                    <img src={like} alt=""></img>
                    <img src={unlike} alt=""></img>
                </div>
            </div>
            {/* {streamManager.stream.videoActive ? null : 
            <div className='video-hidden'>
                <img src={hiddenVideo} alt=""></img>
            </div>} */}
            <video ref={videoRef} autoPlay={true} muted={!streamManager.stream.audioActive} hidden={!streamManager.stream.videoActive} className="video-items"></video>
        </div>
    )
}

export default OVvideo
