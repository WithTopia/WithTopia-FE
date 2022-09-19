import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager ,check}) => {
  if(check===false){
    console.log("써ㅃㅆ뻡써써ㅃ써버뻤ㅂ썹썹",streamManager)
  }
  
    return (
    <div className='video-record'>
      <OVvideo streamManager={streamManager}></OVvideo>
    </div>
  )
}

export default VideoRecord