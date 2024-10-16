import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Interactive from "../Interactives/Interactive";
import InitialDataForm from "./InitialDataForm";
import styles from '../css/StateOne.module.css';
const StateTwo = ({globalData, setGlobalData, serverData, serverDataGot, videoDuration, setServerData, deleteCourse }) => {
  const [interactivesArr, setInteractivesArr] = useState([1]);
  const [currentInteractive, setCurrentInteractive] = useState(0);
  const [initialForm, setInitialForm] = useState(false);
  const [finishBtnClicked, setFinishBtnClicked] = useState(false);
  const [interactiveName, setInteractiveName] = useState('');
  const [allData, setAllData] = useState([]);
  const [interactives, setInteractives] = useState([]);
  const [components, setComponents] = useState([]);
  const [interactivesNamesArr, setInteractivesNamesArr] = useState([]);
  const [coursesButtonsArr, setCoursesButtonsArr] = useState([]);

  // Обработчик для обновления данных из отдельных компонентов : 
  const handleDataChange = (id, newData) => {
    setAllData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, data: newData } : item))
    );
  };

  //Global Data изменяется, когда меняется какая-либо информация в allData. Мы задаем значение интерактивов - добавляя в них allData
  useEffect(() => {
    setGlobalData((prev) => ({ ...prev, interactives: allData})) //OK
    setInteractives(allData);
  }, [allData]);



  //Единажды! Подкачиваем данные с сервера в массив с интерактивами, в allData, сразу формируем количество кнопок в setComponents + 
  //названия интерактивов подкачиваем с сервера
  useEffect(() => {
    if (serverDataGot && serverData['interactives']) {
      setInteractivesArr(serverData['interactives']);
      setAllData(serverData['interactives']);
      
      let newComponentsArr = serverData['interactives'].length;
      let newArr = Array.from({ length: newComponentsArr }, (_, index) => index);
      setComponents(newArr);

      let newInteractivesNamesArr = [];
      for (let interactive in serverData['interactives']) {
        let item = serverData['interactives'][interactive]['data']['interactive_name'];
        newInteractivesNamesArr.push(item);
        
      }
      setInteractivesNamesArr(newInteractivesNamesArr);
      
    }
  }, [serverDataGot])

const deleteInteractiveHandler = (event, indexToRemove) => {
  event.preventDefault();
  // let newAllDataArr = allData.slice(id, -1);
  //   setAllData(newAllDataArr);

  //   let newComponentsArr = components.slice(id, -1);
  //   setComponents(newComponentsArr);

  //   let newCoursesButtonsArr = coursesButtonsArr.slice(id, -1);
  //   setCoursesButtonsArr(newCoursesButtonsArr);

  //   let newInteractives = interactives.slice(id, -1);
  //   setInteractives(newInteractives);

  //   let newInteractivesNamesArr = interactivesNamesArr.slice(id, -1);
  //   setInteractivesNamesArr(newInteractivesNamesArr);

  setAllData(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  setCoursesButtonsArr(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  setInteractivesNamesArr(prevItems => prevItems.filter((_, index) => index !== indexToRemove));

    if(currentInteractive === indexToRemove) {
      setCurrentInteractive(null);
    }    
}
  return (
    <>
      <div className={`${finishBtnClicked && styles.hidden}`}>
        {globalData['heading'] && <h1 className={styles.title}>{globalData['heading']}</h1>}
        
        <Header setInteractivesArr={setInteractivesArr} globalData={globalData} deleteCourse={deleteCourse}
          setCurrentInteractive={setCurrentInteractive} setFinishBtnClicked={setFinishBtnClicked}
          setInitialForm={setInitialForm} initialForm={initialForm} setInteractives={setInteractives} interactives={interactives} serverData={serverData} serverDataGot={serverDataGot}
          interactivesNamesArr={interactivesNamesArr} setInteractiveName={setInteractiveName} interactiveName={interactiveName} setInteractivesNamesArr={setInteractivesNamesArr} currentInteractive={currentInteractive}
        components={components} setAllData={setAllData} setComponents={setComponents} allData={allData} setServerData={setServerData} coursesButtonsArr={coursesButtonsArr} setCoursesButtonsArr={setCoursesButtonsArr}
        
        />
        {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData} />}
        {interactivesArr.map((interactive, index) => (
          <>
          <Interactive
            key={index + interactive}
            interactive={interactive}
            currentInteractive={currentInteractive}
            setCurrentInteractive={setCurrentInteractive}
            setInteractives={setInteractives}
            serverData={serverData} serverDataGot={serverDataGot}
            setInitialForm={setInitialForm}
            initialForm={initialForm}
            videoDuration={videoDuration}
            interactivesNamesArr={interactivesNamesArr}
            setAllData={setAllData}
            id={index}
            onDataChange={handleDataChange}
            interactivesArr={interactivesArr}
            interactives={interactives}
            coursesButtonsArr={coursesButtonsArr}
            setCoursesButtonsArr={setCoursesButtonsArr}
            allData={allData}
            components={components}
            setComponents={setComponents}
            setInteractivesArr={setInteractivesArr}
            setInteractivesNamesArr={setInteractivesNamesArr}
            deleteCourse={deleteCourse}
            setServerData={setServerData}
            interactiveIndex = {index}
            getId={deleteInteractiveHandler}
          />
        </>
        ))}
      </div>
      {finishBtnClicked && <div>
        <p>{serverDataGot ? 'Изменения сохранены' : 'Проект создан'}</p>
      </div>}
    </>
  );
};

export default StateTwo;
