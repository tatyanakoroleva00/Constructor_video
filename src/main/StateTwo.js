import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Interactive from "../Interactives/Interactive";
import InitialDataForm from "./InitialDataForm";
import styles from '../css/StateOne.module.css';
const StateTwo = ({ globalData, setGlobalData, serverData, serverDataGot, videoDuration }) => {
  const [interactivesArr, setInteractivesArr] = useState([1]);
  const [currentInteractive, setCurrentInteractive] = useState(0);
  const [initialForm, setInitialForm] = useState(false);
  const [interactives, setInteractives] = useState([]);
  const [finishBtnClicked, setFinishBtnClicked] = useState(false);
  const [interactivesNamesArr, setInteractivesNamesArr] = useState([]);
  const [interactiveName, setInteractiveName] = useState('');

  console.log(currentInteractive, 'curinter');
  //Здесь все интерактивы добавляются в глобальные данные
  useEffect(() => {
    setGlobalData((prev) => ({ ...prev, interactives: interactives })) //OK
  }, [interactives]);

  useEffect(() => {
    if (serverDataGot) {
      setInteractivesArr(serverData['interactives']);

      for (let interactive in serverData['interactives']) {
        setInteractivesNamesArr(prev => [...prev, serverData['interactives'][interactive]['interactive_name']]);
      }
    }
  }, [serverData['interactives']])
  return (
    <>
      <div className={`${finishBtnClicked && styles.hidden}`}>
        {globalData['heading'] && <h1 className={styles.title}>{globalData['heading']}</h1>}
        <Header setInteractivesArr={setInteractivesArr} globalData={globalData}
          setCurrentInteractive={setCurrentInteractive} setFinishBtnClicked={setFinishBtnClicked}
          setInitialForm={setInitialForm} initialForm={initialForm} setInteractives={setInteractives} interactives={interactives} serverData={serverData} serverDataGot={serverDataGot}
          interactivesNamesArr={interactivesNamesArr} setInteractiveName={setInteractiveName} interactiveName={interactiveName} setInteractivesNamesArr={setInteractivesNamesArr}
        />
        {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData} />}
        {interactivesArr.map((interactive, index) => (
          <Interactive
            key={index + interactive}
            interactiveIndex={index}
            interactive={interactive}
            currentInteractive={currentInteractive}
            setInteractives={setInteractives}
            serverData={serverData} serverDataGot={serverDataGot}
            setInitialForm={setInitialForm}
            initialForm={initialForm}
            videoDuration={videoDuration}
            interactivesNamesArr={interactivesNamesArr}
          />
        ))}
      </div>
      {finishBtnClicked && <div>
        <p>{serverDataGot ? 'Изменения сохранены' : 'Проект создан'}</p>
      </div>}
    </>
  );
};

export default StateTwo;
