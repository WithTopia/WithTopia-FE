import React from 'react'
import { useState ,useRef ,useEffect} from 'react'

const VideoRecord = ({publisher}) => {
    const videoRef = useRef()
    const [streamManager,setStreamManager] = useState("")
    const [streamOn,setStreamOn] = useState(false)
    console.log("펍",publisher)
    
    useEffect(()=>{
      if(publisher !== null){
        // setStreamManager(publisher.stream.streamManager)
        console.log(publisher.stream.streamManager)
        // console.log(publisher.stream)
        publisher.stream.streamManager.addVideoElement(videoRef.current)
        console.log("퍼블리싱 완료")
        setStreamOn(true)
      }else{
        console.log("퍼블리싱 대기중 .. ")
      }
    },[publisher])
    
    return (
    <div className='video-record'>
      {publisher === null || undefined ? null :
      <div>
        <video autoPlay={true} ref={videoRef}></video>
      </div>}
    </div>
  )
}

export default VideoRecord