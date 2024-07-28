import React, { useState, useEffect } from "react";
import BottomBtn from "../BottomBtn";
import Details from "../Details";
import MoreAdresses from "../MoreAdresses";
import MorePhones from "../MorePhones";
import WorkingDays from "../WorkingDays";
import AOS from "aos";
import "aos/dist/aos.css";

const GlobalInfoParts = ({ setGlobalStep }) => {
  const [etape, setEtape] = useState(1);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const ToRender = () => {
    switch (etape) {
      case 1:
        return <MoreAdresses />;
        break;
      case 2:
        return <MorePhones />;
        break;
      case 3:
        return <WorkingDays />;
        break;
      case 4:
        return <Details />;
      default:
        return <MoreAdresses />;
        break;
    }
  };
  return (
    <>
      {etape !== 4 && (
        <div className="md:w-4/5 w-full p-4 bg-white  flex flex-col justify-center items-center ">
          <div
            className="w-full flex items-center justify-center "
            data-aos="zoom-in"
          >
            <button
              onClick={() => {
                setEtape(1);
              }}
              className="w-2/6 mx-2 p-2 bg-gradient-to-r text-white uppercase font-robot text-center from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-sm rounded-lg"
            >
              <p className="text-sm ">Adresses</p>
            </button>
            <button
              onClick={() => {
                setEtape(2);
              }}
              className="w-2/6 mx-2 p-2 bg-gradient-to-r text-white uppercase font-robot text-center from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-sm rounded-lg"
            >
              <p className="text-sm ">Numéro Telephone</p>
            </button>
            <button
              onClick={() => {
                setEtape(3);
              }}
              className="w-2/6 mx-2 p-2 bg-gradient-to-r text-white uppercase font-robot text-center from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-sm rounded-lg"
            >
              <p className="text-sm ">Jour de travialle</p>
            </button>
          </div>
          <div className="w-full ">
            <div
              className={`mt-2 transition-all duration-500 h-0.5 bg-orange-500 ease-in ${
                etape === 1
                  ? "w-2/6"
                  : etape === 2
                  ? "w-2/3"
                  : etape === 3
                  ? "w-full"
                  : "hidden"
              }`}
            ></div>
          </div>
        </div>
      )}

      <div className="md:w-4/5 w-full p-4 bg-white my-2">{ToRender()}</div>
      <div className="w-full">
        <BottomBtn etape={etape} setEtape={setEtape} />
      </div>
    </>
  );
};

export default GlobalInfoParts;
