import React from "react";
import { PackageStepperContext } from "../../../hooks/packageStepperContext";

const NextBackBtn = ({
  back,
  next,
  step,
  handlClick,
  data,
  preparObjectAndsend,
}) => {
  // const { data } = PackageStepperContext();
  return (
    <div className="w-full flex justify-center items-center my-4">
      {step !== 1 && (
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
          onClick={() => back()}
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Retour
          </span>
        </button>
      )}
      {step < 4 && (
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          onClick={() => {
            if (handlClick) handlClick();
            next();
          }}
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Confirmé
          </span>
        </button>
      )}

      {step === 4 && (
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          onClick={() => {
            preparObjectAndsend();
          }}
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Envoyé
          </span>
        </button>
      )}
      {/* <button className="m-2" onClick={() => console.log(data)}>
        LogData
      </button> */}
    </div>
  );
};

export default NextBackBtn;
