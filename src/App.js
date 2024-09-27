import Constructor from "./Constructor";
// import VideoCourse from './VideoCourse';
import { useState } from "react";
import styles from './css/App.module.css';
function App() {
  const [videoData, setVideoData] = useState({});
  const [interactivesArr, setInteractivesArr] = useState([]);
  const [playBtnIsClicked, setPlayBtnIsClicked] = useState(false);

  return (
    <div className={styles['constructor-page']}>
    <div className={styles.container}>
      <Constructor playBtnIsClicked={playBtnIsClicked} setVideoData={setVideoData} setInteractivesArr={setInteractivesArr} setPlayBtnIsClicked={setPlayBtnIsClicked}/>
      {/* {playBtnIsClicked && <VideoCourse setPlayBtnIsClicked={setPlayBtnIsClicked} videoData={videoData} interactivesArr={interactivesArr} />} */}
    </div>
    {playBtnIsClicked && <div className={styles['iframe-wrapper']}>
      <iframe src="http://quiz.site/videocourses/?courseId=928" width={800} height="100%" scrolling="no"></iframe>
    </div>}
    </div>
  );
}

export default App;
