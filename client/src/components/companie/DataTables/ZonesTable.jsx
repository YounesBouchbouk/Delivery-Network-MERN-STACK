import axios from "axios";
import React, { useState, useEffect } from "react";

const ZonesTable = ({
  deliveryzones,
  error,
  loading,
  setLoading,
  setError,
  fetchZone,
  forProfil,
}) => {
  const [city, setCity] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const [newZone, setNewZone] = useState({
    index: 0,
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get("/cityandcountry/get/city/all");
      const { cities } = response.data;

      setCity(cities);
      console.log(cities);
    };
    fetchData();
    fetchZone();
    setLoading(false);
  }, []);

  const addNewZone = async () => {
    const response = await axios.post("/delivery/add/deliveryZone", newZone);
    const { status } = response.data;
    if (status === "successfully") {
      setStatus("Nous avons bien ajouté votre nouvelle zone de laivraison");
      fetchZone();
    } else {
      setError("someThing went wrong");
    }

    setTimeout(() => {
      setError(false);
      setStatus(false);
      setLoading(false);
    }, 5000);
  };

  const DeleteOne = async (id) => {
    console.log(id);
    const response = await axios.delete(`/delivery/remove/deliveryZone/${id}`);
    const { status } = response.data;
    if (status === "successfully") {
      setStatus("Vous avez bien supprimé votre zone de laivraison");
      fetchZone();
    } else {
      setError("Some Thing Went Wrong");
    }

    setTimeout(() => {
      setError(false);
      setStatus(false);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="p-4 w-full bg-orange-500 ">
        <p className="font-robot text-sm text-white">
          Attendez s'il cous plait ...
        </p>
      </div>
    );
  } else if (error) {
    return (
      <div className="p-4 w-full bg-red-500 ">
        <p className="font-robot text-sm text-white">{error}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full bg-white p-4 flex  flex-col justify-start items-center ">
        {status && (
          <div className="p-4 w-full bg-green-500 ">
            <p className="font-robot text-sm text-white">{status}</p>
          </div>
        )}

        <div className="flex flex-col-reverse w-full">
          {!forProfil && (
            <div className="grid w-full grid-cols-1 xl:gap-6  p-4">
              <div className="grid w-full grid-cols-2 xl:gap-6 ">
                <div class="relative z-0 w-full mb-2 group">
                  <select
                    onChange={(e) => {
                      setNewZone({
                        ...newZone,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="from"
                    class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
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
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    From
                  </label>
                </div>

                <div class="relative z-0 w-full mb-2 group">
                  <select
                    onChange={(e) => {
                      setNewZone({
                        ...newZone,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="to"
                    class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
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
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    To
                  </label>
                </div>
              </div>

              {/* Part 2  */}

              <div className="grid w-full grid-cols-2 xl:gap-6 ">
                <div class="relative z-0 w-full mb-2 group">
                  <select
                    onChange={(e) => {
                      setNewZone({
                        ...newZone,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="estimated_days"
                    class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre de Jour
                  </label>
                </div>

                <div class="relative z-0 w-full mb-2 group">
                  <input
                    type="text"
                    name="fees"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=""
                    required
                    onChange={(e) => {
                      setNewZone({
                        ...newZone,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Frais
                  </label>
                </div>
                <div class="relative z-0 w-full mb-2 group">
                  <button
                    onClick={() => {
                      addNewZone();
                    }}
                    type="button"
                    class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
                  >
                    Ajouté
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* table  */}
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full  p-2">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    From
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Estimated
                  </th>
                  <th scope="col" class="px-6 py-3">
                    frais
                  </th>
                  {!forProfil && (
                    <th scope="col" class="px-6 py-3">
                      action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {deliveryzones?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {`${item.from?.name} to ${item.to?.name}`}
                      </th>
                      <td class="px-6 py-4">{item.estimated_days}</td>
                      <td class="px-6 py-4">{item.fees}</td>
                      <td class="px-6 py-4 text-right">
                        {!forProfil && (
                          <a
                            href="#"
                            class="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => {
                              // dispatche({
                              //   type: "REMOVE_ZONE",
                              //   index: item.index,
                              // });
                              DeleteOne(item._id);
                            }}
                          >
                            Suprimé
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div class=" z-0 w-full mb-2 flex  justify-center items-center mt-3">
          <button
            type="button"
            class="text-white w-2/6 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            Confirmé
          </button>
        </div> */}
      </div>
    );
  }
};

export default ZonesTable;
