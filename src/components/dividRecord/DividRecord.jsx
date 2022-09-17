import { useState ,useRef ,useEffect} from 'react'

const DividRecord = ({sub}) => {
    console.log("섭",sub)
    const videoRef = useRef()
    const [streamManager,setStreamManager] = useState("")
    const [subOn,setSubOn] = useState(false)
    
    useEffect(()=>{
      
      if(sub[0]){
        // setStreamManager(publisher.stream.streamManager)
        console.log("구독 정보",sub[0].stream.streamManager)
        
        // console.log(publisher.stream)
        sub[0].stream.streamManager.addVideoElement(videoRef.current)
        
        setSubOn(true)
      }else{
        console.log("구독 대기중 .. ")
      }
    },[sub])
  return (
    <div className='dividrecord'>
      {subOn === true ? 
      <video autoPlay={true} ref={videoRef}></video>
      : null}
    </div>
  )
}

export default DividRecord