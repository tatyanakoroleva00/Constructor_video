import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Interactive from "./Interactives/Interactive";
import InitialDataForm from "./InitialDataForm";
import styles from './css/StateOne.module.css';
const StateTwo = ({globalData, setGlobalData, serverData, serverDataGot}) => {
  const [interactivesArr, setInteractivesArr] = useState([1]);
  const [currentInteractive, setCurrentInteractive] = useState(0);
  const [initialForm, setInitialForm] = useState(false);
  const [interactives, setInteractives] = useState([]);
  const [finishBtnClicked, setFinishBtnClicked] = useState(false);

      //Здесь все интерактивы добавляются в глобальные данные
  useEffect(() => {
    setGlobalData((prev) => ({ ...prev, interactives: interactives })) //OK
}, [interactives]);

  useEffect(() => {  //OK
    if(serverDataGot) {
      setInteractivesArr(serverData['interactives']);
    } 
  }, [serverData['interactives']])


  return (
    <>
    <div className={`${finishBtnClicked && styles.hidden}`}>
      {globalData['heading'] && <h1 className={styles.title}>{globalData['heading']}</h1>}
      <Header
        setInteractivesArr={setInteractivesArr} globalData={globalData}
        setCurrentInteractive={setCurrentInteractive} setFinishBtnClicked={setFinishBtnClicked}
        setInitialForm={setInitialForm} initialForm={initialForm} setInteractives={setInteractives} interactives={interactives} serverData={serverData} serverDataGot={serverDataGot}
      />
      {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData}/>}
      {interactivesArr.map((interactive, index) => (
        <Interactive
          key={index}
          interactiveIndex={index}
          interactive={interactive}
          currentInteractive={currentInteractive}
          setInteractives={setInteractives}
          serverData={serverData} serverDataGot={serverDataGot}
          setInitialForm={setInitialForm}
          initialForm={initialForm}
        />
      ))}
    </div>
    {finishBtnClicked && <div>
      <p>{serverDataGot ? 'Изменения сохранены' : 'Курс создан'}</p>
    </div>}
    </>
  );
};

export default StateTwo;
