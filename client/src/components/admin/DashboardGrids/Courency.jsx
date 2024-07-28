import axios from "axios";
import React, { useState } from "react";

const Courency = ({ currencies, getCourrency }) => {
  const [newCurrency, setCurrency] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const addCurrecy = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/foradmin/addMany/currency",
        newCurrency
      );
      const { status, message } = response.data;
      // (response.data);
      if (status === "successfully") {
        setStatus(`Nous avons Bien ajouté ${response.data.newCurrency.name}`);
        getCourrency();
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
      const response = await axios.delete(`/foradmin/delete/oneCurrency/${id}`);

      const { status, message, currency } = response.data;
      response.data;
      if (status === "successfully") {
        setStatus(`Nous avons Bien Supprimé ${currency.name}`);
        getCourrency();
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
    <div className="bg-white p-2 col-span-1">
      <p className="text-sm font-robot m-1">
        Liste Des Counrrency de laivrason
      </p>
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

      {/* Table */}
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full  p-2">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Symbole
              </th>

              <th scope="col" class="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((item, index) => {
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
                  <td class="px-6 py-4">{item.symbol}</td>
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
      </div>

      {/* ^^Înputs */}
      <div className="grid w-full grid-cols-3 xl:gap-6  p-4">
        <div className="grid w-full col-span-2 xl:gap-6 ">
          <input
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
            placeholder="Name"
            required
            onChange={(e) => {
              setCurrency({ ...newCurrency, [e.target.name]: e.target.value });
            }}
          />
        </div>

        <div className="grid w-full col-span-1 xl:gap-6 ">
          <input
            type="text"
            name="symbol"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
            placeholder="Symbole"
            required
            onChange={(e) => {
              setCurrency({ ...newCurrency, [e.target.name]: e.target.value });
            }}
          />
        </div>

        <div class="relative z-0 w-full  col-span-3 group">
          <button
            onClick={() => {
              addCurrecy();
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

export default Courency;
