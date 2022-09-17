import { useState ,useRef ,useEffect} from 'react'

const DividRecord = ({subscribers}) => {
    console.log("섭",subscribers)
    const videoRef = useRef()
    const [streamManager,setStreamManager] = useState("")
    const [subOn,setSubOn] = useState(false)
    
    useEffect(()=>{
      if(subscribers.length !== 0){
        // setStreamManager(publisher.stream.streamManager)
        console.log(subscribers.stream.streamManager)
        // console.log(publisher.stream)
        subscribers.stream.streamManager.addVideoElement(videoRef.current)
        console.log("구독 완료")
        setSubOn(true)
      }else{
        console.log("구독 대기중 .. ")
      }
    },[subscribers])
  return (
    <div className='dividrecord'>
      {subOn ? 
      <video autoPlay={true} ref={videoRef}></video>
      : null}
    </div>
  )
}

export default DividRecord