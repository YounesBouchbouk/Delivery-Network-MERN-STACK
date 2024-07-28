import React from "react";
import { FaParachuteBox } from "react-icons/fa";
const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col item-center justify-center">
      <div className="w-1/2">
        <FaParachuteBox className="text-2xl  text-orange-400 animate-spin mb-4" />
        <p className="text-md font-robot text-orange-400"> Loading ....</p>
      </div>
    </div>
  );
};

export default Loading;
