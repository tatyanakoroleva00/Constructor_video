import Constructor from "./Constructor";
import VideoCourse from './VideoCourse';
import { useState } from "react";
import styles from './css/App.module.css';
function App() {
  const [videoData, setVideoData] = useState({});
  const [interactivesArr, setInteractivesArr] = useState([]);
  const [playBtnIsClicked, setPlayBtnIsClicked] = useState(false);

  return (
    <div className={styles.container}>
      <Constructor setVideoData={setVideoData} setInteractivesArr={setInteractivesArr} setPlayBtnIsClicked={setPlayBtnIsClicked}/>
      {playBtnIsClicked && <VideoCourse videoData={videoData} interactivesArr={interactivesArr} />}
    </div>
  );
}

export default App;
