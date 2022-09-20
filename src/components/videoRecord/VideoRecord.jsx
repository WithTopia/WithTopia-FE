import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager}) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <OVvideo streamManager={streamManager}></OVvideo>
      ) : null}
    </div>
  )
}

export default VideoRecord