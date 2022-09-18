import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager ,check}) => {
    if(check===true){
      console.log("구독자",streamManager)
      
    }else{
      console.log("개설자",streamManager)
    } 
    return (
    <div className='video-record'>
      <OVvideo streamManager={streamManager} check={check}></OVvideo>
    </div>
  )
}

export default VideoRecord