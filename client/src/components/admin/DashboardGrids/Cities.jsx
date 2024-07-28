import axios from "axios";
import React, { useState } from "react";
import Pagination from "../Pagination";

const Cities = ({ cities, contries, getCities, pagination, dispatch }) => {
  const [newCity, setCity] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const addCities = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/cityandcountry/add/city", newCity);
      const { status, message, city } = response.data;
      if (status === "successfuly") {
        setStatus(`Nous avons Bien ajouté ${city.name}`);
        getCities();
      } else {
        setError(message || "Un Error");
      }
    } catch (error) {
      setError(error);
    }

    setLoading(false);

    setTimeout(() => {
      setError(false);
      setStatus(false);
    }, 5000);
  };

  const deleteOne = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/cityandcountry/remove/city/${id}`);

      const { status, message, citie } = response.data;
      if (status === "successfully") {
        setStatus(`Nous avons Bien Supprimé ${citie.name}`);
        getCities();
      } else {
        setError(message || "Un Error");
      }
    } catch (error) {
      setError(error);
    }

    setLoading(false);

    setTimeout(() => {
      setError(false);
      setStatus(false);
    }, 5000);
  };
  return (
    <div className="bg-white p-2 col-span-1 ">
      <p className="text-sm font-robot m-1">Liste Des Ville de laivrason</p>
      <div className="bg-orange-300 h-0.5"></div>

      {status && (
        <div className="p-4 w-full bg-green-500 ">
          <p className="font-robot text-sm text-white">{status}</p>
        </div>
      )}

      {loading && (
        <div className="p-4 w-full bg-orange-500 ">
          <p className="font-robot text-sm text-white">
            Attendez s'il cous plait ...
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 w-full bg-red-500 ">
          <p className="font-robot text-sm text-white">{error}</p>
        </div>
      )}

      <div className="w-full flex justify-between items-end">
        <div className="w-32 mb-4 ">
          <select
            className="w-full border bg-white rounded px-3 py-2 outline-none"
            onChange={(e) => {
              dispatch({ type: "SET_TYPE", filterByCountry: e.target.value });
              dispatch({ type: "SETPAGE", page: 1 });
            }}
          >
            <option value={"all"}>Tous</option>
            {contries.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full  p-2">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Ville
              </th>
              <th scope="col" class="px-6 py-3">
                Pays
              </th>

              <th scope="col" class="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {cities?.map((item, index) => {
              return (
                <tr
                  key={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <td class="px-6 py-4">{item.in_country.name}</td>
                  {/* <td class="px-6 py-4">{item.fees}</td> */}
                  <td class="px-6 py-4 text-right">
                    <a
                      href="#"
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        deleteOne(item._id);
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
        <div class="relative z-0 w-full  col-span-3 group">
          <Pagination
            nbtotal={pagination.dataLenght}
            dispatch={dispatch}
            page={pagination.page}
            limit={pagination.limit}
          />{" "}
        </div>
      </div>

      <div className="grid w-full grid-cols-3 xl:gap-6  p-4">
        <div className="grid w-full col-span-2 xl:gap-6 ">
          <input
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
            placeholder="Name"
            required
            onChange={(e) => {
              setCity({ ...newCity, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="grid w-full col-span-1 xl:gap-6 ">
          <select
            name="countryId"
            class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            onChange={(e) => {
              setCity({ ...newCity, [e.target.name]: e.target.value });
            }}
          >
            <option value={"null"}>Pays</option>
            {contries.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div class="relative z-0 w-full  col-span-3 group">
          <button
            onClick={() => {
              addCities();
              newCity;
            }}
            type="button"
            class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
          >
            Ajouté
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cities;
