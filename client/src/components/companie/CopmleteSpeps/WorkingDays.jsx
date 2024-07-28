import React, { useEffect, useState } from "react";
import { useStepperContext } from "../../../hooks/stepsContext";
import AOS from "aos";
import "aos/dist/aos.css";

const WorkingDays = () => {
  const { data, dispatche } = useStepperContext();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const EngDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [checked, setChecked] = useState({});
  // Add/Remove checked item from list
  const handleCheck = (e) => {
    // var updatedList = [...checked];
    if (e.target.checked) {
      setChecked({ ...checked, [e.target.name]: true });
      // updatedList = [...checked, event.target.value];
      dispatche({ type: "ADD_DAY", day: e.target.name });
    } else {
      setChecked({ ...checked, [e.target.name]: false });
      dispatche({ type: "REMOVE_DAY", day: e.target.name });

      // updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    // setChecked(updatedList);

    console.log(data);
  };

  const isChecked = (item) => false;
  // checked.includes(item)
  //   ? "text-md uppercase ml-2 text-orange-400 font-bold"
  //   : "text-md uppercase ml-2 ";

  return (
    <div
      className="w-full   flex items-center justify-start flex-wrap"
      data-aos="fade-left"
    >
      {days.map((day, index) => {
        return (
          <div
            key={index}
            className=" flex justify-center items-center flex-wrap px-4   "
          >
            <input
              value={day}
              type="checkbox"
              name={EngDays[index]}
              onChange={handleCheck}
              className="mr-4 md:mr-2 "
            />
            <span className={isChecked(day)}>{day}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WorkingDays;
