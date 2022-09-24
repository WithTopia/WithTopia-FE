import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager,role}) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager} role={role}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord