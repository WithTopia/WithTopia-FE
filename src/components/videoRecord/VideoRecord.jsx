import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager,hidden,mute,role}) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager} hidden={hidden} mute={mute} role={role}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord