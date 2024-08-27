import React from "react";
import InitialData from "./Buttons/InitialData";
import FinishCourse from "./Buttons/FinishCourse";
import AddCourse from "./Buttons/AddCourse";
import DeleteCourse from "./Buttons/DeleteCourse";
import { useState, useEffect } from "react";
import CoursesButton from "./Buttons/CoursesButton";

const Header = ({ setInteractivesArr, setCurrentInteractive, setInitialForm, initialForm, setInteractives, interactives, globalData, serverDataGot, serverData, setFinishBtnClicked }) => {
  const [coursesButtonsArr, setCoursesButtonsArr] = useState([1]);
  const [initialData, setInitialData] = useState(false);

  useEffect(() => {
    setInteractivesArr(coursesButtonsArr);
  }, [coursesButtonsArr]);

  const addCourseHandler = () => {
    setCoursesButtonsArr((prev) => [...prev, 1]);
  };
  const deleteCourseHandler = () => {
    setCoursesButtonsArr(coursesButtonsArr.slice(0, -1));

    if(coursesButtonsArr.length === interactives.length) {
      setInteractives(interactives.slice(0, -1));
    }
  };

  useEffect(() => {
    if(serverDataGot) setCoursesButtonsArr(serverData['interactives']); //OK
  }, [serverData['interactives']]);

  return (
    <div>
      <div>
        <div><InitialData setInitialForm={setInitialForm} initialForm={initialForm} setInitialData={setInitialData}/></div>
        <div><AddCourse addCourse={addCourseHandler} />
        <DeleteCourse deleteCourse={deleteCourseHandler} /></div>
      </div>
      <div>
        {coursesButtonsArr.map((_, index) => (
          <CoursesButton key={index} btnIndex={index} setCurrentInteractive={setCurrentInteractive}/>
        ))}
      </div>
      <div><FinishCourse serverDataGot={serverDataGot} globalData={globalData} setFinishBtnClicked={setFinishBtnClicked}/></div>
    </div>
  );
};

export default Header;
