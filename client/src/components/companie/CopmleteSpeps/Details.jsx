import React, { useEffect } from "react";
import { useStepperContext } from "../../../hooks/stepsContext";

import AOS from "aos";
import "aos/dist/aos.css";

function getKey(dys) {
  const arr = [],
    obj = Object.keys(dys);
  for (var x in obj) {
    if (dys[obj[x]] === true) {
      arr.push(obj[x]);
    }
  }
  return arr;
}
const Details = () => {
  const { data, dispatche } = useStepperContext();
  const workingds = getKey(data.workingdays);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className="w-full flex flex-col  md:grid md:grid-col-3 md:gap-4"
      data-aos="fade-left"
    >
      <div className=" col-span-1 ">
        <p className="font-robot ">Adresses : </p>
        <div className="w-full h-0.5 bg-orange-300 mx-2 "></div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Rue
                </th>
                <th scope="col" class="px-6 py-3">
                  Ville
                </th>
                <th scope="col" class="px-6 py-3">
                  Code Postale
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.adresses.map((item, index) => {
                return (
                  <tr
                    key={item.index}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {item.Street}
                    </th>
                    <td class="px-6 py-4">{item.city}</td>
                    <td class="px-6 py-4">{item.zipCode}</td>
                    <td class="px-6 py-4 text-right">
                      <a
                        href="#"
                        class="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => {
                          dispatche({
                            type: "REMOVE_ADRESS",
                            index: item.index,
                          });
                        }}
                      >
                        Suprimé
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-span-1   px-2 py-4 ">
        <p>Numéros de téléphone : </p>
        <div className="w-full h-0.5 bg-orange-300 mx-2 "></div>

        <div className="w-full p-2 bg-white flex flex-col lg:flex-row justify-start items-center">
          {data.phones.map((item) => {
            return (
              <div className="px-2 py-2 w-full  m-2 flex-wrap  flex items-center justify-center border-2 border-slate-500 rounded-md ">
                <p className="text-sm font-bold  mr-3">{item}</p>
                <a
                  href="#"
                  class="font-xs text-red-600 dark:text-red-500 hover:underline"
                  onClick={() => {
                    dispatche({
                      type: "REMOVE_PHONE_NUMBER",
                      phone: item,
                    });
                  }}
                >
                  Suprimé
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-span-2 px-2 py-4 ">
        <p>Jours De travail</p>
        <div className="w-full h-0.5 bg-orange-300 mx-2 "></div>

        <div className="flex justify-center items-center ">
          {workingds?.map((item) => {
            return (
              <div className="px-4 py-1 flex justify-center">
                <p className="mr-2">{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
