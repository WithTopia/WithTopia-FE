import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager }) => {
    return (
    <div className='video-record'>
      <OVvideo streamManager={streamManager}></OVvideo>
    </div>
  )
}

export default VideoRecord