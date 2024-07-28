import React from "react";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { FaRoute } from "react-icons/fa";

import { AiOutlineSearch, AiOutlinePlusCircle } from "react-icons/ai";
import useFindUser from "../../hooks/useFindUser";

const Aside = () => {
  const { Logout } = useFindUser();
  return (
    <aside className="h-full w-14 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <Link to={"/user/dashboard"}>
          <BsList className="animate-pulse text-2xl" />
        </Link>
      </div>

      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <Link to={"/user/new/package"}>
          <AiOutlinePlusCircle className="animate-pulse text-2xl" />
        </Link>
      </div>
      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <Link to="/user/paths">
          <FaRoute className="animate-pulse text-2xl" />
        </Link>
      </div>

      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <Link to={"/user/dashboard/profil"}>
          <CgProfile className="animate-pulse text-2xl" />
        </Link>
      </div>

      <button
        onClick={Logout}
        className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
      >
        <BiLogOut className="animate-pulse text-2xl" />
      </button>
    </aside>
  );
};

export default Aside;
