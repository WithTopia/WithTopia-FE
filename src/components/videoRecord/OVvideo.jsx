import { useState ,useRef ,useEffect} from 'react'
import {Link} from "react-router-dom"

const OVvideo = ({streamManager,check}) => {
    const videoRef = useRef()
    // const [streamManager,setStreamManager] = useState("")
    // const [streamOn,setStreamOn] = useState(false)
    console.log("펍",streamManager)
    useEffect(()=>{
        if (streamManager !== null && videoRef.current){
            streamManager.addVideoElement(videoRef.current)
        }
        // else if(check === false && streamManager !== null && videoRef.current){
        //     streamManager[0].stream.streamManager.addVideoElement(videoRef.current)
        // }    
      },[])
    return (
        <div>
            <video ref={videoRef} autoPlay={true} muted={true} hidden={false}></video>
        </div>
    
       
    )
}

export default OVvideo
//  {/* {publisher === null || undefined ? null :
//             <video autoPlay={true} ref={videoRef}></video>
//         } */}