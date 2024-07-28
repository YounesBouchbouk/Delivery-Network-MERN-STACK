import axios from "axios";
import React, { useEffect, useState } from "react";

function getKey(dys) {
  const arr = [],
    obj = Object.keys(dys);
  for (var x in obj) {
    if (dys[obj[x]] === true) {
      arr.push(obj[x]);
    }
  }
  return arr;
}
const WorkingDaysPart = ({ user }) => {
  const [workingObj, setWorkingObj] = useState(user.workingDays);
  const [checked, setChecked] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setChecked(getKey(workingObj));
    setLoading(false);
  }, [workingObj]);

  const handleCheck = (e) => {
    // var updatedList = [...checked];
    if (e.target.checked) {
      setWorkingObj({ ...workingObj, [e.target.name]: true });
      // updatedList = [...checked, event.target.value];
      // setChecked(getKey(workingObj));
      //  dispatche({ type: "ADD_DAY", day: e.target.name });
    } else {
      setWorkingObj({ ...workingObj, [e.target.name]: false });
      //  dispatche({ type: "REMOVE_DAY", day: e.target.name });
      // updatedList.splice(checked.indexOf(event.target.value), 1);
      console.log(workingObj);
    }
    // setChecked(updatedList);

    // console.log(data);
  };
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

  const HandleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "/delivery/update/workingDays",
        workingObj
      );
      const { status } = response.data;

      if (status === "successfully") {
        setStatus("Nous Avous Bien Modifier Votre Jour De Travaille");
      } else {
        setError("Some Thing went Wrong");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
    setTimeout(() => {
      setError(false);
      setStatus(false);
    }, 5000);
  };

  return (
    <div className="w-full ">
      <p className="text-sm font-robot m-1">Working Days</p>
      <div className="bg-orange-300 h-0.5"></div>

      <div className="w-full">
        {loading && (
          <div className="p-4 w-full bg-orange-500 ">
            <p className="font-robot text-xl text-white">
              Attendez s'il cous plait ...
            </p>
          </div>
        )}

        {error && (
          <div className="p-2 w-full bg-red-500 ">
            <p className="font-robot text-sm text-white">{error}</p>
          </div>
        )}
        {status && (
          <div className="p-2 w-full ">
            <p className="font-robot text-sm text-green-500">{status}</p>
          </div>
        )}
        <div className="w-full   flex  my-2 items-center justify-start flex-wrap">
          {days.map((day, index) => {
            return (
              <div
                key={index}
                className=" flex justify-center flex-col  items-center flex-wrap px-4   "
              >
                <input
                  value={EngDays[index]}
                  type="checkbox"
                  name={EngDays[index]}
                  onChange={handleCheck}
                  className="mr-4 md:mr-2 checkbox checkbox-xs text-orange-500 rounded-full "
                  checked={checked.includes(EngDays[index])}
                />
                <span
                  className={`${
                    checked.includes(EngDays[index]) ? "font-bold" : ""
                  } uppercase text-sm font-robot`}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div class="relative z-0 w-full mb-2 group">
        <button
          onClick={() => {
            HandleUpdate();
            console.log(workingObj);
          }}
          type="button"
          class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
        >
          Modifier
        </button>
      </div>
    </div>
  );
};

export default WorkingDaysPart;
