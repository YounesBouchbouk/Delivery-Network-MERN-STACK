import React from "react";
import useFindUser from "../../hooks/useFindUser";
import Aside from "./Aside";

const AdminLayout = ({ children }) => {
  const { user, isLoanding } = useFindUser();
  return (
    <div className="w-full flex">
      <div className="fixed w-16  h-screen">
        <Aside />
      </div>
      <div className="ml-16 w-full h-screen">
        <div className="w-full h-14 bg-slate-500 fixed overflow-hidden z-50">
          <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">
              <div className="flex flex-col items-end ">
                <div className="text-md font-medium ">{user?.email}</div>
                <div className="text-sm font-regular">Admin</div>
              </div>

              <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>
            </div>
          </header>
        </div>
        <div className="mt-14 w-full flex flex-row justify-center items-center ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
