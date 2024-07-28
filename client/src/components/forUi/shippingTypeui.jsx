import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { RiShip2Line } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
const ShippingTypeui = ({ name }) => {
  return (
    <div className="w-full flex justify-around items-center">
      <GiCommercialAirplane
        className={`${
          name === "air" ? " text-orange-400" : " text-slate-300"
        } text-2xl`}
      />
      <RiShip2Line
        className={`${
          name === "ocean" ? " text-orange-400" : " text-slate-300"
        } text-2xl`}
      />
      <MdOutlineLocalShipping
        className={`${
          name === "land" ? " text-orange-400" : " text-slate-300"
        } text-2xl`}
      />
    </div>
  );
};

export default ShippingTypeui;
