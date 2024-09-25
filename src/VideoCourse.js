import React from 'react'
import Player from './videoplayer/Player';
const VideoCourse = ({videoData, interactivesArr, setPlayBtnIsClicked}) => { 
  return (
    <Player setPlayBtnIsClicked={setPlayBtnIsClicked} interactivesArr={interactivesArr} videoData={videoData}/>
  )
}

export default VideoCourse