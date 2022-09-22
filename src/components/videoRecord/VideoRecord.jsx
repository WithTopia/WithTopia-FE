import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager,hidden,mute}) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager} hidden={hidden} mute={mute}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord