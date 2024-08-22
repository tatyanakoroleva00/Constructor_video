import StateOne from "./StateOne";
import StateTwo from "./StateTwo";
import { useState } from "react";
import styles from './css/Constructor.module.css';

const Constructor = () => {
const [switchStates, setSwitchStates] = useState(false);
const [serverDataGot, setServerDataGot] = useState(false);
const [globalData, setGlobalData] = useState({
  'heading' : '', 
  'url' : '',
});
const [serverData, setServerData] = useState({});

console.log(globalData, 'gb');
console.log(serverData, 'sv');
  return (
    <div className={styles['constructor-wrapper']}>
        <div className={`${switchStates && styles.invisible}`}><StateOne setServerData={setServerData} setServerDataGot={setServerDataGot} setSwitchStates={setSwitchStates} setGlobalData={setGlobalData} /></div>
        <div className={`${!switchStates && styles.invisible}`}><StateTwo serverDataGot={serverDataGot} serverData={serverData} globalData={globalData} setGlobalData={setGlobalData} /></div>
    </div>
  );
};

export default Constructor;
