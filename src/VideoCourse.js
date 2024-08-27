import React from 'react'
import Player from './video_player/Player';
import styles from './video_player/css/VideoCourse.module.css';
const VideoCourse = ({videoData, interactivesArr, setPlayBtnIsClicked}) => { 
  return (
    <Player setPlayBtnIsClicked={setPlayBtnIsClicked} interactivesArr={interactivesArr} videoData={videoData}/>
  )
}

export default VideoCourse