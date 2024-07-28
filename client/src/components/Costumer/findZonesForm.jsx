import axios from "axios";
import { BsSearch } from "react-icons/bs";
import React, { useEffect, useState, useRef } from "react";
const FindZonesForm = ({ findPath, dispatche }) => {
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const fromSelect = useRef();
  const toSelect = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/cityandcountry/get/city/all");
      const { cities } = response.data;
      setCity(cities);
    };
    fetchData();
  }, []);

  const handlSearch = () => {
    console.log(fromSelect.current.value);
    console.log(toSelect.current.value);

    findPath(fromSelect.current.value, toSelect.current.value);
  };
  return (
    <div className="p-2 flex justify-between items-center w-full">
      <div className=" p-2 w-3/5 flex flex-row items-center justify-between ">
        <div className="px-2 p-1 w-1/4">
          <label className="block mb-2 font-medium text-gray-900 dark:text-gray-400 font-Bebas  text-xl">
            De
          </label>
          <select
            ref={fromSelect}
            name="from"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Ville</option>
            {city?.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item?.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="px-2 p-1 w-1/4">
          <label className="block mb-2 font-medium text-gray-900 dark:text-gray-400 font-Bebas  text-xl">
            À
          </label>
          <select
            ref={toSelect}
            name="to"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Ville</option>
            {city?.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item?.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="px-2 p-1 w-1/4">
          <label className="block mb-2 font-medium text-gray-900 dark:text-gray-300 font-Bebas  text-xl">
            Poids
          </label>
          <input
            type="number"
            className="bg-gray-50 p-2.5 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Kg"
            required
            min={0}
          />
        </div>

        <div class="px-2 p-1 w-1/4">
          <label
            for="email"
            class="block mb-2 font-medium text-gray-900 dark:text-gray-300 font-Bebas  text-xl"
          >
            Unité
          </label>
          <input
            type="number"
            className="bg-gray-50 p-2.5 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="unit"
            required
            min={0}
          />
        </div>
      </div>
      <div />
      <div className=" p-2 flex-1 flex items-center justify-center">
        <button
          onClick={handlSearch}
          className="p-2 px-6 text-md w-4/12 font-robot flex items-center justify-center mt-8 bg-orange-400 rounded-md text-white uppercase "
        >
          <BsSearch className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default FindZonesForm;
