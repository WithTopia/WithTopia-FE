import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager ,check}) => {
    return (
    <div className='video-record'>
      <OVvideo streamManager={streamManager} check={check}></OVvideo>
    </div>
  )
}

export default VideoRecord