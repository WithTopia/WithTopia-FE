import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager}) => {
  console.log(streamManager)  
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord