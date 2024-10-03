import React from "react";
import InitialData from "../Buttons/InitialData";
import FinishCourse from "../Buttons/FinishCourse";
import AddCourse from "../Buttons/AddCourse";
import DeleteCourse from "../Buttons/DeleteCourse";
import { useState, useEffect } from "react";
import CoursesButton from "../Buttons/CoursesButton";
import styles from '../css/Buttons.module.css';
import Modal_Interactives from "../modal_windows/Modal_Interactives";

const Header = ({ setInteractivesArr, setCurrentInteractive, setInitialForm, initialForm, setInteractives, 
  interactives, globalData, serverDataGot, serverData, setFinishBtnClicked, interactivesNamesArr, 
  setInteractiveName, interactiveName, setInteractivesNamesArr, currentInteractive }) => {
  const [coursesButtonsArr, setCoursesButtonsArr] = useState([]);
  const [activeBtn, setActiveBtn] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    setInteractivesArr(coursesButtonsArr);
  }, [coursesButtonsArr]);

  useEffect(() => {
    if (serverDataGot) setCoursesButtonsArr(serverData['interactives']); //OK
    console.log(coursesButtonsArr, 'coursesBtnsArr');
  }, [serverData['interactives']]);

  const addCourseHandler = () => {
    openModal();
  };
  const deleteCourseHandler = () => {
    setCoursesButtonsArr(coursesButtonsArr.slice(0, -1));

    if (coursesButtonsArr.length === interactives.length) {
      setInteractives(interactives.slice(0, -1));
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const confirmModal = () => {
    setCoursesButtonsArr((prev) => [...prev, 1]);
    setInteractivesNamesArr(prev => [...prev, interactiveName]);
    setActiveBtn(coursesButtonsArr.length);
    setIsModalOpen(false);
    setCurrentInteractive(coursesButtonsArr.length);
  };



  return (
    <div>
      <div>
        <div className={styles['buttons-row']}><div><InitialData setInitialForm={setInitialForm} initialForm={initialForm} /></div>
          {interactives.length > 0 &&
            <div><FinishCourse serverDataGot={serverDataGot} globalData={globalData} setFinishBtnClicked={setFinishBtnClicked} /></div>}
        </div>
        <div>
          {!initialForm && <AddCourse addCourse={addCourseHandler} />}
          {!initialForm && coursesButtonsArr.length > 0 && <DeleteCourse deleteCourse={deleteCourseHandler} />}
        </div>
      </div>
      <div>
        {!initialForm && coursesButtonsArr.map((_, index) => (
          <CoursesButton interactiveName={interactiveName} serverDataGot={serverDataGot} serverData={serverData} interactivesNamesArr={interactivesNamesArr} activeBtn={activeBtn} setActiveBtn={setActiveBtn} index={index} key={index} btnIndex={index} setCurrentInteractive={setCurrentInteractive} />
        ))}
      </div>
      <Modal_Interactives setInteractiveName={setInteractiveName} interactivesNamesArr={interactivesNamesArr} isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmModal} header="Добавить новый интерактив" message="Вы создаете новый интерактив. Несохраненные данные будут потеряны" setInteractivesNamesArr={setInteractivesNamesArr} answer1="Подтвердить" answer2="Сбросить" />
    </div>
  );
};

export default Header;
