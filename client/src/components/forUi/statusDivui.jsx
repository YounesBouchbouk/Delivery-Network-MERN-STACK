import React from "react";

const StatusDivui = ({ label }) => {
  let Color = "border-green-700";
  let bgColor = "";
  switch (label) {
    case "payed":
      Color = "bg-green";
      bgColor = "bg-green-400";
      break;
    // case "padding":
    //   break;
    case "Arrived":
      Color = "bg-green";
      bgColor = "bg-green-300";
      break;
    // case "on way":
    //   break;
    case "delivred":
      Color = "bg-green";
      bgColor = "bg-green-300";
      break;
    case "return":
      Color = "bg-red";
      bgColor = "bg-red-300";
      break;

    default:
      Color = "bg-yellow";
      bgColor = "bg-yellow-400";
      break;
  }
  return (
    <div
      className={`p-2 font-robot text-xs uppercase   text-white  font-bold  rounded-lg  ${bgColor}  ${Color} text-center border-2 `}
    >
      {label}
    </div>
  );
};

export default StatusDivui;
