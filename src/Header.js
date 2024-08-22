import React from "react";
import InitialData from "./Buttons/InitialData";
import FinishCourse from "./Buttons/FinishCourse";
import AddCourse from "./Buttons/AddCourse";
import DeleteCourse from "./Buttons/DeleteCourse";
import { useState, useEffect } from "react";
import CoursesButton from "./Buttons/CoursesButton";

const Header = ({ setInteractivesArr, setCurrentInteractive, setInitialForm, initialForm, setInteractives, interactives, globalData, serverDataGot, serverData }) => {
  const [coursesButtonsArr, setCoursesButtonsArr] = useState([1]);

  //Автонаполнение - кол-во кнопок  - кол-во интерактивов
  useEffect(() => {
    setInteractivesArr(coursesButtonsArr);
  }, [coursesButtonsArr, setInteractivesArr]);

  
  const addCourseHandler = () => {
    setCoursesButtonsArr((prev) => [...prev, 1]);
  };
  const deleteCourseHandler = () => {
    setCoursesButtonsArr(coursesButtonsArr.slice(0, -1));
    setInteractives(interactives.slice(0, -1));
  };
  return (
    <div>
      <div>
        <div><InitialData setInitialForm={setInitialForm} initialForm={initialForm}/></div>
        <div><AddCourse addCourse={addCourseHandler} />
        <DeleteCourse deleteCourse={deleteCourseHandler} /></div>
      </div>
      <div>
        {coursesButtonsArr.map((_, index) => (
          <CoursesButton key={index} btnIndex={index} setCurrentInteractive={setCurrentInteractive}/>
        ))}
      </div>
      <div><FinishCourse globalData={globalData} /></div>
    </div>
  );
};

export default Header;
