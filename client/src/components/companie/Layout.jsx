import React, { useContext } from "react";
import { UserContext } from "../../hooks/Usercontext";
import Aside from "./Aside";

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="w-full flex">
      <div className="fixed w-14  h-screen ">
        <Aside />
      </div>
      <div className=" w-full h-screen  ">
        <div className="w-full h-12 bg-slate-500 fixed z-50">
          <header className="h-12 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800  shadow-md shadow-orange-300">
            <div className="flex flex-shrink-0 items-center space-x-4 text-black">
              <div className="flex flex-col items-end ">
                <div className="text-md font-medium text-orange-400  ">
                  {user?.name}
                </div>
                <div className="text-sm font-regular text-white">Delivery</div>
              </div>
            </div>
          </header>
        </div>
        <div className="mt-14  w-full flex flex-row justify-center items-center -z-30">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
