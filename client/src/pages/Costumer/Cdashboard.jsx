// import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../components/Costumer/UserLayout";
import UserPackagesTable from "../../components/Costumer/UserPackagesTable";

const Dashboard = () => {
  return (
    <UserLayout>
      <div className="w-full  p-4 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex justify-between items-center w-3/4">
            <div className=" py-2 ">
              <p className="text-xl uppercase  font-mono">Mes Courier</p>
            </div>
            <div className="py-2">
              <Link
                to="/user/new/package"
                class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <span className="text-lg font-bold">+</span> Nouveux Courier
              </Link>
            </div>
          </div>

          <div className="bg-orange-400 h-0.5 w-3/4 m-4"></div>
        </div>

        <UserPackagesTable forProfil={false} isOwner={true} />
      </div>
    </UserLayout>
  );
};

export default Dashboard;
