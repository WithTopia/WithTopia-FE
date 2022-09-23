import React from 'react'
import OVvideo from './OVvideo'



const VideoRecord = ({streamManager,role,nickname}) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager} role={role} nickname={nickname}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord