import {useRef ,useEffect, useState} from 'react'
import hiddenVideo from "../../assets/cam-off.png"
import like from "../../assets/like.png"
import unlike from "../../assets/unlike.png"
import "./VideoRecord.scss"

const OVvideo = ({streamManager,hidden,mute,role}) => {
    console.log("캠 on off",hidden)
    console.log("마이크 on off",mute)
    const videoRef = useRef()
    useEffect(()=>{
        if (streamManager !== undefined && videoRef.current){
            streamManager.addVideoElement(videoRef.current)
        }
      },[])
    const handelHidden = () => {
        
    }
    return (
        <div className='video-content'>
            <div className='video-contents'>
                {role === "master" ?
                    <h3 className='video-username'>{streamManager.session.connection.data}</h3> : 
                    <h3 className='video-username'>{streamManager.stream.connection.data}</h3>}
                <div className='video-likes'>
                    {mute ? "마이크 킴" : "마이크 끔"}
                    <img src={like} alt=""></img>
                    <img src={unlike} alt=""></img>
                </div>
            </div>
            {hidden ? null : 
            <div className='video-hidden'>
                <img src={hiddenVideo}></img>
            </div>}
            <video ref={videoRef} autoPlay={true} muted={mute} hidden={!hidden} className="video-items"></video>
        </div>
    )
}

export default OVvideo