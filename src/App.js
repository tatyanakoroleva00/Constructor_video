import Constructor from "./Constructor";
import VideoCourse from './VideoCourse';
import { useState } from "react";
import styles from './css/App.module.css';
function App() {
  const [videoData, setVideoData] = useState({});
  const [interactivesArr, setInteractivesArr] = useState([]);
  const [playBtnIsClicked, setPlayBtnIsClicked] = useState(false);
  const [iframeIsShown, setIframeIsShown] = useState(false);

  return (
    <div className={styles.container}>
      <Constructor setVideoData={setVideoData} setInteractivesArr={setInteractivesArr} setPlayBtnIsClicked={setPlayBtnIsClicked} setIframeIsShown={setIframeIsShown}/>
      {playBtnIsClicked && <VideoCourse setPlayBtnIsClicked={setPlayBtnIsClicked} videoData={videoData} interactivesArr={interactivesArr} />}
      <div className={styles['iframe-code']}></div>
    </div>
  );
}

export default App;
