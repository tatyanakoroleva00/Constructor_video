import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Interactive from "./Interactives/Interactive";
import InitialDataForm from "./InitialDataForm";
const StateTwo = ({globalData, setGlobalData, serverData, serverDataGot}) => {
  const [interactivesArr, setInteractivesArr] = useState([1]);
  const [currentInteractive, setCurrentInteractive] = useState();
  const [initialForm, setInitialForm] = useState(false);
  const [interactives, setInteractives] = useState([]);
  console.log(interactives, 'interactives');

      //Здесь все интерактивы добавляются в глобальные данные
  useEffect(() => {
    setGlobalData((prev) => ({ ...prev, interactives: interactives }))
}, [interactives]);

console.log(interactivesArr, 'interAA');
  return (
    <div>
      <Header
        setInteractivesArr={setInteractivesArr} globalData={globalData}
        setCurrentInteractive={setCurrentInteractive}
        setInitialForm={setInitialForm} initialForm={initialForm} setInteractives={setInteractives} interactives={interactives} serverData={serverData} serverDataGot={serverDataGot}
      />
      {interactivesArr.map((interactive, index) => (
        <Interactive
          key={index}
          interactiveIndex={index}
          interactive={interactive}
          currentInteractive={currentInteractive}
          setInteractives={setInteractives}
          serverData={serverData} serverDataGot={serverDataGot}
        />
      ))}
      {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData} />}
    </div>
  );
};

export default StateTwo;
