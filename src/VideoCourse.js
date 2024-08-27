import React from 'react'
import Player from './video_player/Player'
const VideoCourse = ({videoData, interactivesArr}) => { 
  return (
    <div>
    <Player interactivesArr={interactivesArr} videoData={videoData}/>
    </div>

  )
}

export default VideoCourse