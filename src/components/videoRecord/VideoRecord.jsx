import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager,hidden,mute,username}) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager} hidden={hidden} mute={mute} username={username}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord