import React from "react";
import InitialData from "../Buttons/InitialData";
import FinishCourse from "../Buttons/FinishCourse";
import AddCourse from "../Buttons/AddCourse";
import DeleteCourse from "../Buttons/DeleteCourse";
import { useState, useEffect } from "react";
import CoursesButton from "../Buttons/CoursesButton";
import styles from '../css/Buttons.module.css';

const Header = ({ setInteractivesArr, setAddNeInteractiveBtnIsClicked, setCurrentInteractive, setInitialForm, initialForm, setInteractives, interactives, globalData, serverDataGot, serverData, setFinishBtnClicked }) => {
  const [coursesButtonsArr, setCoursesButtonsArr] = useState([]);
  const [initialData, setInitialData] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);

  useEffect(() => {
    setInteractivesArr(coursesButtonsArr);
  }, [coursesButtonsArr]);

  const addCourseHandler = () => {
    setAddNeInteractiveBtnIsClicked(true);
    setCoursesButtonsArr((prev) => [...prev, 1]);
  };
  const deleteCourseHandler = () => {
    setCoursesButtonsArr(coursesButtonsArr.slice(0, -1));

    if (coursesButtonsArr.length === interactives.length) {
      setInteractives(interactives.slice(0, -1));
    }
  };

  useEffect(() => {
    if (serverDataGot) setCoursesButtonsArr(serverData['interactives']); //OK
  }, [serverData['interactives']]);

  return (
    <div>
      <div>
        <div className={styles['buttons-row']}><div><InitialData setInitialForm={setInitialForm} initialForm={initialForm} setInitialData={setInitialData} /></div>
        {interactives.length > 0 &&
          <div><FinishCourse serverDataGot={serverDataGot} globalData={globalData} setFinishBtnClicked={setFinishBtnClicked} /></div>}
        </div>
        <div>
          {!initialForm && <AddCourse addCourse={addCourseHandler} />}
          {!initialForm && interactives.length > 0 && <DeleteCourse deleteCourse={deleteCourseHandler} />}
        </div>
      </div>
      <div>
        {!initialForm && coursesButtonsArr.map((_, index) => (
          <CoursesButton activeBtn={activeBtn} setActiveBtn={setActiveBtn} index={index} key={index} btnIndex={index} setCurrentInteractive={setCurrentInteractive} />
        ))}
      </div>
    </div>
  );
};

export default Header;
