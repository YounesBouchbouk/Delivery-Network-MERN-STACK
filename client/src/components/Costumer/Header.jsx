import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </a>
          </div>

          <nav className="flex space-x-10">
            <div className="relative">
              <Link
                type="button"
                className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-expanded="false"
                to={"/user/dashboard"}
              >
                <span>Courier</span>
              </Link>
            </div>

            <Link
              to="/user/paths"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Avaliable Delivery
            </Link>
            <Link
              to={"/user/dashboard/profil"}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Profil
            </Link>

            <div className="relative">
              <button
                type="button"
                className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span>More</span>
              </button>
            </div>
          </nav>
          <div className="flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="#"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
