import React from "react";
import { GoLocation, GoPackage } from "react-icons/go";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
const PackageStepperBar = ({ step }) => {
  return (
    <div className=" p-4 w-full m-6">
      <div className="flex items-center">
        <div
          className={`flex items-center ${
            step > 1 ? "text-orange-300" : "text-white"
          } relative`}
        >
          <div
            className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex justify-center items-center ${
              step === 1 && "bg-orange-300"
            }  border-orange-300`}
          >
            <GoLocation className="feather feather-user-plus text-2xl"></GoLocation>
          </div>
          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-orange-300">
            Zone
          </div>
        </div>

        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step > 1 ? "border-orange-300" : "border-gray-300"
          }`}
        ></div>

        {/* package */}
        <div
          className={`flex items-center ${
            step > 2 ? "text-orange-300" : "text-white"
          } relative`}
        >
          <div
            className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex justify-center items-center ${
              step === 2
                ? "bg-orange-300  border-orange-300"
                : step > 2
                ? "text-orange-300 border-orange-300"
                : "border-gray-300 text-gray-400"
            }  `}
          >
            <GoPackage className="feather feather-user-plus text-2xl"></GoPackage>
          </div>
          <div
            className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase  ${
              step === 2 || step > 2 ? "text-orange-300" : "text-gray-500 "
            } `}
          >
            Colis Info
          </div>
        </div>

        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step > 2 ? "border-orange-300" : "border-gray-300"
          }`}
        ></div>
        {/* product */}
        <div
          className={`flex items-center ${
            step > 3 ? "text-orange-300" : " text-white"
          } relative`}
        >
          <div
            className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex items-center justify-center ${
              step === 3
                ? "bg-orange-300  border-orange-300"
                : step > 3
                ? "text-orange-300 border-orange-300"
                : "border-gray-300 text-gray-400"
            }  `}
          >
            <MdProductionQuantityLimits className="feather feather-user-plus text-2xl"></MdProductionQuantityLimits>
          </div>
          <div
            className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase  ${
              step === 3 || step > 3 ? "text-orange-300" : "text-gray-500 "
            } `}
          >
            Produits
          </div>
        </div>

        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step > 3 ? "border-orange-300" : "border-gray-300"
          }`}
        ></div>

        {/* Review */}
        <div
          className={`flex items-center ${
            step > 4 ? "text-orange-300" : " text-white "
          } relative`}
        >
          <div
            className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex items-center justify-center ${
              step === 4
                ? "bg-orange-300  border-orange-300"
                : step > 4
                ? "text-orange-300 border-orange-300"
                : "border-gray-300 text-gray-400"
            }  `}
          >
            <AiOutlineEye className="feather feather-user-plus text-2xl"></AiOutlineEye>
          </div>
          <div
            className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase  ${
              step === 4 || step > 4 ? "text-orange-300" : "text-gray-500 "
            } `}
          >
            Examiner et confirmer
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageStepperBar;
