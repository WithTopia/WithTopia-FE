import {useRef ,useEffect, useState} from 'react'
import hiddenVideo from "../../assets/cam-off.png"
import "./VideoRecord.scss"

const OVvideo = ({streamManager,hidden,mute,username}) => {
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
                <h3 className='video-username'>{username}</h3>
                <div>like</div>
            </div>
            {hidden ? <div className='video-hidden'>
                <img src={hiddenVideo}></img>
            </div> : null}
            <video ref={videoRef} autoPlay={true} muted={mute} hidden={hidden} className="video-items"></video>
            
        </div>
    )
}

export default OVvideo