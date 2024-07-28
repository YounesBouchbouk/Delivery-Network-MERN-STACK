import React, { useContext } from "react";
import { GlobalStepContext } from "../../../hooks/GlobalStepContext";
// import { useGlobalStepContext } from "../../../hooks/GlobalStepContext";

const BottomBtn = (props) => {
  const { index, setIndex } = useContext(GlobalStepContext);
  const next = () => {
    props.setEtape(props.etape + 1);
  };

  const back = () => {
    props.setEtape(props.etape - 1);
  };
  return (
    <div className="w-full flex items-center justify-center my-4">
      {props.etape !== 1 && (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            back();
          }}
        >
          Back
        </button>
      )}

      {props.etape !== 4 && (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            next();
          }}
        >
          Next
        </button>
      )}

      {props.etape === 4 && (
        <button
          type="button"
          className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            setIndex(2);
          }}
        >
          Confirmé
        </button>
      )}
    </div>
  );
};

export default BottomBtn;
