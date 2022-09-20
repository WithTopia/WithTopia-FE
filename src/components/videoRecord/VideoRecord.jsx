import React from 'react'
import OVvideo from './OVvideo'

const VideoRecord = ({streamManager,index}) => {
    console.log(index,"썹썹",streamManager)
    return (
      <OVvideo streamManager={streamManager}></OVvideo>
    )
}

export default VideoRecord