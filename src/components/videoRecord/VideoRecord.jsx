import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager,role,nicknames}) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager} role={role} nicknames={nicknames}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord