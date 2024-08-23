import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Interactive from "./Interactives/Interactive";
import InitialDataForm from "./InitialDataForm";
const StateTwo = ({globalData, setGlobalData, serverData, serverDataGot}) => {
  const [interactivesArr, setInteractivesArr] = useState([1]);
  const [currentInteractive, setCurrentInteractive] = useState(0);
  const [initialForm, setInitialForm] = useState(false);
  const [interactives, setInteractives] = useState([]);

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
    <div>
      <Header
        setInteractivesArr={setInteractivesArr} globalData={globalData}
        setCurrentInteractive={setCurrentInteractive}
        setInitialForm={setInitialForm} initialForm={initialForm} setInteractives={setInteractives} interactives={interactives} serverData={serverData} serverDataGot={serverDataGot}
      />
      {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData} />}
      <hr></hr>
      {interactivesArr.map((interactive, index) => (
        <Interactive
          key={index}
          interactiveIndex={index}
          interactive={interactive}
          currentInteractive={currentInteractive}
          setInteractives={setInteractives}
          serverData={serverData} serverDataGot={serverDataGot}
          setInitialForm={setInitialForm}
        />
      ))}
      
    </div>
  );
};

export default StateTwo;
