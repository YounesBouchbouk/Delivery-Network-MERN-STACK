import React, { useState, useEffect, createContext, useContext } from "react";
import DelivaryZoneInfo from "../../components/companie/CopmleteSpeps/BigParts/DelivaryZoneInfo";

import GlobalInfoParts from "../../components/companie/CopmleteSpeps/BigParts/GlobalInfoParts";
import ShippingTarrifPart from "../../components/companie/CopmleteSpeps/BigParts/ShippingTarrifPart";
import {
  GlobalStepContext,
  useGlobalStepContext,
  UseGlobalStepContextProvider,
} from "../../hooks/GlobalStepContext";
import AOS from "aos";
import "aos/dist/aos.css";

import { UseContextProvider } from "../../hooks/stepsContext";

const CompleteInformation = () => {
  const [index, setIndex] = useState(1);
  // const [stape, setStape] = useState(1);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const ToRender = () => {
    switch (index) {
      case 1:
        return <GlobalInfoParts />;
        break;
      case 2:
        return <DelivaryZoneInfo />;
        break;
      case 3:
        return <ShippingTarrifPart />;
        break;
      // case 4:
      //   return <Details />;
      // default:
      //   return <MoreAdresses />;
      //   break;
    }
  };

  return (
    <UseContextProvider>
      <GlobalStepContext.Provider value={{ index, setIndex }}>
        <div className="bg-slate-50 w-full  flex  flex-col justify-center items-center">
          <div className="w-full flex flex-col mt-6 px-6" data-aos="fade-down">
            <p className="text-lg lg:text-xl font-robot font-bold ">
              Avant de continuer, nous avons besoin de quelques informations:
            </p>
            <div className="w-4/5 mb-4 mt-2 h-0.5  bg-orange-400  "></div>
            <div className="w-full"></div>
          </div>
          <div className="md:w-4/5 w-full p-4  mb-2 flex items-center justify-center relative">
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in  ${
                index === 1 ? "w-2/6" : index === 2 ? "w-3/4" : "w-full"
              } bg-orange-400 h-1 rounded-lg shadow-md shadow-black`}
            ></div>
            <div className="w-full flex items-center justify-center">
              {[
                {
                  index: 1,
                  name: "Contact Information",
                },
                {
                  index: 2,
                  name: "les zone de laivraison",
                },
                {
                  index: 3,
                  name: "shipping Tarrif",
                },
              ].map((item) => {
                return (
                  <div
                    key={item.index}
                    className="w-4/12  flex items-center justify-center  flex-col "
                    data-aos="zoom-in"
                  >
                    <div
                      className={`w-16 h-16 md:w-20   md:h-20  rounded-full ${
                        item.index === index ? "bg-orange-400" : "bg-orange-200"
                      } flex justify-center items-center`}
                    >
                      <p className="font-bold text-md md:text-xl ">
                        {item.index}
                      </p>
                    </div>

                    <p className="font-robot text-xs md:text-base text-center">
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <GlobalInfoParts /> */}
          {ToRender()}
        </div>
      </GlobalStepContext.Provider>
    </UseContextProvider>
  );
};

export default CompleteInformation;
