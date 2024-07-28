import axios from "axios";
import React, { useEffect, useState } from "react";
// import ShippingTypeui from "../../forUi/shippingTypeui";
import { GiCommercialAirplane } from "react-icons/gi";
import { RiShip2Line } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
const TariffTable = ({
  deliveryzones,

  fetchZone,
  forProfil,
}) => {
  const [newTarrif, setTarrif] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const [shippingTypes, setShippingType] = useState([]);
  const [filterDeliveryZones, setFilterd] = useState([]);
  const fetchshippingType = async () => {
    const response = await axios.get("/shipping/getAll/shippingType");
    console.log(response);
    const { status, List } = response.data;
    setShippingType(List);
  };

  useEffect(() => {
    setFilterd(deliveryzones);
    setLoading(true);
    fetchshippingType();
    // fetchdeliveryZones();
    setLoading(false);
  }, []);

  const addNewTarrif = async () => {
    const response = await axios.post(
      "/shipping/addOne/shippingTariff",
      newTarrif
    );
    console.log(response.data);
    const { status } = response.data;
    if (status === "successfully") {
      setStatus("Nous avons bien ajouté un nouvelle Tariff");
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
    const response = await axios.delete(
      `/shipping/DeleteOne/shippingTariff/${id}`
    );
    console.log(response.data);
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

  const HandleFilter = (e) => {
    if (e.target.value === "all") {
      setFilterd(deliveryzones);
    } else {
      const NewObject = deliveryzones.filter(
        (item) => item._id === e.target.value
      );
      setFilterd(NewObject);
    }
  };

  return (
    <div className="w-full p-4 bg-white flex flex-col justify-center items-center  ">
      {loading && (
        <div className="p-4 w-full bg-orange-500 ">
          <p className="font-robot text-xl text-white">
            Attendez s'il cous plait ...
          </p>
        </div>
      )}

      {error && (
        <div className="p-2 w-full bg-red-500 ">
          <p className="font-robot text-sm text-white">{error}</p>
        </div>
      )}
      {status && (
        <div className="p-2 w-full ">
          <p className="font-robot text-sm text-green-500">{status}</p>
        </div>
      )}

      <div className="w-full bg-white flex flex-col-reverse  justify-center items-center ">
        {!forProfil && (
          <div className="w-full   grid grid-cols-2 my-4">
            <div class="relative z-0 w-full mb-2 group col-span-1 mr-2">
              <select
                onChange={(e) => {
                  setTarrif({ ...newTarrif, [e.target.name]: e.target.value });
                }}
                name="delivery_zone"
                //   defaultChecked={data.zones[0]?._id}
                class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              >
                <option>Zone</option>

                {deliveryzones?.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {/* {`${item.from.name} to ${item.to.name}`} */}
                      {/* {idToname(item._id)} */}
                      {/* {item._id} */}
                      {`${item.from?.name} to ${item.to?.name}`}
                    </option>
                  );
                })}
              </select>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                zone
              </label>
            </div>

            <div class="relative z-0 w-full mb-2 group col-span-1 ml-2">
              <select
                onChange={(e) => {
                  setTarrif({ ...newTarrif, [e.target.name]: e.target.value });
                }}
                name="shipping_type"
                //   defaultChecked={data.shippingTypes[0]?._id}
                class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              >
                <option>Type</option>

                {shippingTypes?.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.typeOfshipping}
                    </option>
                  );
                })}
              </select>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                shipping_type
              </label>
            </div>

            {/* iput 1 */}

            <div class="relative z-0 w-full my-2 group col-span-1 mr-2">
              <input
                type="number"
                name="price_par_kg"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=""
                required
                onChange={(e) => {
                  setTarrif({ ...newTarrif, [e.target.name]: e.target.value });
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                price_par_kg
              </label>
            </div>

            {/* iput 2 */}

            <div class="relative z-0 w-full my-2 group col-span-1 ml-2 ">
              <input
                type="number"
                name="price_par_km"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=""
                required
                onChange={(e) => {
                  setTarrif({ ...newTarrif, [e.target.name]: e.target.value });
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                price_par_km
              </label>
            </div>

            {/* iput 3 */}

            <div class="relative z-0 w-full my-2 group col-span-1 mr-2">
              <input
                type="text"
                name="cost_par_unit_ofvolume"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=""
                required
                onChange={(e) => {
                  setTarrif({ ...newTarrif, [e.target.name]: e.target.value });
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                cost_par_unit_ofvolume
              </label>
            </div>

            {/* iput 4 */}

            <div class="relative z-0 w-full my-2 group col-span-1 ml-2 ">
              <input
                type="text"
                name="fees"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=""
                required
                onChange={(e) => {
                  setTarrif({ ...newTarrif, [e.target.name]: e.target.value });
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                fees
              </label>
            </div>

            <div class="relative z-0 w-full mb-2 group">
              <button
                onClick={() => {
                  addNewTarrif();
                }}
                type="button"
                class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
              >
                Ajouté
              </button>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col items-center justify-start">
          {/* table  */}
          <div className="w-full flex items-end">
            <select
              onChange={(e) => {
                HandleFilter(e);
              }}
              className="px-2 py-1 text-sm border-2 border-orange-400 rounded-full text-black"
            >
              <option value="all">Tous</option>
              {deliveryzones.map((item, index) => {
                return (
                  <option
                    key={item._id}
                    value={item._id}
                  >{`${item.from?.name} to ${item.to?.name}`}</option>
                );
              })}
            </select>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full  p-2">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    zone
                  </th>
                  <th scope="col" class="px-6 py-3">
                    type
                  </th>
                  <th scope="col" class="px-6 py-3">
                    par km
                  </th>
                  <th scope="col" class="px-6 py-3">
                    par kg
                  </th>
                  <th scope="col" class="px-6 py-3">
                    UOV
                  </th>
                  <th scope="col" class="px-6 py-3">
                    fees
                  </th>

                  {!forProfil && (
                    <th scope="col" class="px-6 py-3">
                      action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filterDeliveryZones.map((item, index) => {
                  const { shippingtariff } = item;
                  return shippingtariff.map((tarrif) => {
                    return (
                      <tr
                        key={tarrif._id}
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {/* {`${idToname(tarrif.delivery_zone)}`} */}
                          {`${item.from?.name} to ${item.to?.name}`}
                        </th>
                        <td class="px-6 py-4">
                          {/* <ShippingTypeui
                            name={tarrif.shipping_type.typeOfshipping}
                          /> */}
                          {tarrif.shipping_type.typeOfshipping === "air" ? (
                            <GiCommercialAirplane
                              className={`text-orange-400
                                  text-2xl`}
                            />
                          ) : tarrif.shipping_type.typeOfshipping ===
                            "ocean" ? (
                            <RiShip2Line
                              className={`text-orange-400
                                  text-2xl`}
                            />
                          ) : (
                            <MdOutlineLocalShipping
                              className={`text-orange-400
                                  text-2xl`}
                            />
                          )}
                        </td>
                        <td class="px-6 py-4">{tarrif.price_par_km}</td>
                        <td class="px-6 py-4">{tarrif.price_par_kg}</td>
                        <td class="px-6 py-4">
                          {tarrif.cost_par_unit_ofvolume}
                        </td>
                        <td class="px-6 py-4">{tarrif.fees}</td>

                        <td class="px-6 py-4 text-right">
                          {!forProfil && (
                            <a
                              href="#"
                              class="font-medium text-red-600 dark:text-red-500 hover:underline"
                              onClick={() => {
                                DeleteOne(tarrif._id);
                              }}
                            >
                              Suprimé
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffTable;
