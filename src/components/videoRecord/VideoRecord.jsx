import React from 'react'
import { useState ,useRef ,useEffect,createRef} from 'react'

const VideoRecord = ({publisher,setPublisher}) => {
    const videoRef = useRef()
    const [streamManager,setStreamManager] = useState("")
    const [streamOn,setStreamOn] = useState(false)

    useEffect(()=>{
      if(publisher !== null){
        // setStreamManager(publisher.stream.streamManager)
        console.log(publisher.stream.streamManager)
        // console.log(publisher.stream)
        publisher.stream.streamManager.addVideoElement(videoRef.current)
        setStreamOn(true)
      }else{
        console.log("대기중 .. ")
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