import StateOne from "./StateOne";
import StateTwo from "./StateTwo";
import { useState } from "react";
import styles from './css/Constructor.module.css';

const Constructor = ({setVideoData, setInteractivesArr, setPlayBtnIsClicked, setIframeIsShown}) => {
const [switchStates, setSwitchStates] = useState(false);
const [serverDataGot, setServerDataGot] = useState(false);
const [globalData, setGlobalData] = useState({
  'heading' : '', 
  'url' : '',
});
const [serverData, setServerData] = useState({});
  return (
    <div className={styles['constructor-wrapper']}>
        <div className={`${switchStates && styles.invisible}`}><StateOne setIframeIsShown={setIframeIsShown} setPlayBtnIsClicked={setPlayBtnIsClicked} setVideoData={setVideoData} setInteractivesArr={setInteractivesArr} setServerData={setServerData} setServerDataGot={setServerDataGot} setSwitchStates={setSwitchStates} setGlobalData={setGlobalData} /></div>
        <div className={`${!switchStates && styles.invisible}`}><StateTwo serverDataGot={serverDataGot} serverData={serverData} globalData={globalData} setGlobalData={setGlobalData} /></div>
    </div>
  );
};

export default Constructor;
