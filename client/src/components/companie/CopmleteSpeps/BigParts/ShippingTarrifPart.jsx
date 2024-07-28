import React, { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";
import ShippingTypeui from "../../../forUi/shippingTypeui";
import AOS from "aos";
import "aos/dist/aos.css";

const initialValue = {
  loading: false,
  error: false,
  status: false,
  zones: [],
  shippingTypes: [],
  shipingTarrifs: [],
};
const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: !state.loading };
      break;
    case "SET_ERROR":
      return { ...state, error: action.error };
      break;
    case "SET_STATUS":
      return { ...state, status: action.status };
      break;
    case "GET_ZONES":
      console.log(action.data);
      return { ...state, status: true, zones: action.data };
    case "GET_SHIPPING_TYPES":
      console.log(action.data);
      return { ...state, status: true, shippingTypes: action.data };
    case "ADD_TARRIF":
      return {
        ...state,
        shipingTarrifs: [...state.shipingTarrifs, action.newTarrif],
      };
    case "DELETE_TARRIF":
      const newList = state.shipingTarrifs.filter(
        (item) => item.index !== action.index
      );
      return {
        ...state,
        shipingTarrifs: newList,
      };
    default:
      break;
  }
};

const ShippingTarrifPart = () => {
  const [data, dispatch] = useReducer(Reducer, initialValue);
  const [newTarrif, setTarrif] = useState({
    index: 0,
  });

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchdeliveryZones = async () => {
      const response = await axios.get("/delivery/getAuth/deliveryZone");
      const { status, zoneList } = response.data;
      if (status === "successfully")
        dispatch({ type: "GET_ZONES", data: zoneList });
      else dispatch({ type: "SET_ERROR", error: "Some thing Went Wrong" });
    };

    const fetchShippingTypes = async () => {
      const response = await axios.get("/shipping/getAll/shippingType");
      const { status, List } = response.data;
      if (status === "successfully")
        dispatch({ type: "GET_SHIPPING_TYPES", data: List });
      else dispatch({ type: "SET_ERROR", error: "Some thing Went Wrong" });
    };

    fetchdeliveryZones();
    fetchShippingTypes();
    dispatch({ type: "SET_LOADING" });

    dispatch({
      type: "SET_STATUS",
      status: false,
    });
  }, []);

  const idToname = (id) => {
    const obj = data.zones.filter((item) => item._id === id);
    return `${obj[0]?.from.name} to ${obj[0]?.to.name}`;
  };
  const nameOfShippingType = (id) => {
    const obj = data.shippingTypes.filter((item) => item._id === id);
    return `${obj[0]?.typeOfshipping}`;
  };

  const sendDataToDb = async () => {
    dispatch({ type: "SET_LOADING" });

    const response = await axios.post(
      "/shipping/addMany/shippingTariff",
      data.shipingTarrifs
    );
    const { status, message } = response.data;

    if (status === "successfully") {
      dispatch({
        type: "SET_STATUS",
        status:
          "Mercie D'avoir Complete votre information , vous pouvez ajouté ou modifier ces donnes d'aprés votre profil",
      });
      setTimeout(() => {
        window.location.href = "/delivery/Dashboard/profil";
      }, 5000);
    } else {
      dispatch({ type: "SET_ERROR", error: "Some thing Went Wrong" });
      setTimeout(() => {
        dispatch({ type: "SET_ERROR", error: false });
      }, 5000);
    }
    dispatch({ type: "SET_LOADING" });
  };
  const HandlClick = () => {
    setTarrif({ ...newTarrif, index: data.shipingTarrifs.length + 1 });
    dispatch({ type: "ADD_TARRIF", newTarrif: newTarrif });
  };

  return (
    <div className="w-full m-4  p-4 bg-white flex flex-col justify-center items-center  ">
      {data.loading && (
        <div className="p-4 w-full bg-orange-500 ">
          <p className="font-robot text-xl text-white">
            Attendez s'il cous plait ...
          </p>
        </div>
      )}

      {data.error && (
        <div className="p-4 w-full bg-red-500 ">
          <p className="font-robot text-xl text-white">{data.error}</p>
        </div>
      )}
      {data.status && (
        <div className="p-4 w-full ">
          <p className="font-robot text-xl text-green-500">{data.status}</p>
        </div>
      )}

      <div
        className="w-full bg-white flex flex-col xl:flex-row justify-center items-center "
        data-aos="fade-left"
      >
        <div className="w-full xl:w-1/2  grid grid-cols-2 p-4 px-8 ">
          <div class="relative z-0 w-full mb-2 group col-span-1 mr-2">
            <select
              onChange={(e) => {
                setTarrif({ ...newTarrif, [e.target.name]: e.target.value });
              }}
              name="delivery_zone"
              defaultChecked={data.zones[0]?._id}
              class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            >
              <option value="">chemin</option>
              {data.zones?.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {/* {`${item.from.name} to ${item.to.name}`} */}
                    {idToname(item._id)}
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
              defaultChecked={data.shippingTypes[0]?._id}
              class="bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            >
              {data.shippingTypes?.map((item) => {
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
                HandlClick();
                console.log(newTarrif);
              }}
              type="button"
              class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
            >
              Ajouté
            </button>
          </div>
        </div>

        <div className="w-full xl:w-1/2 flex items-center justify-start">
          {/* table  */}
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
                  <th scope="col" class="px-6 py-3">
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.shipingTarrifs.map((item, index) => {
                  return (
                    <tr
                      key={item.index}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {`${idToname(item.delivery_zone)}`}
                      </th>
                      <td class="px-6 py-4">
                        <ShippingTypeui
                          name={nameOfShippingType(item.shipping_type)}
                        />
                      </td>
                      <td class="px-6 py-4">{item.price_par_km}</td>
                      <td class="px-6 py-4">{item.price_par_kg}</td>
                      <td class="px-6 py-4">{item.cost_par_unit_ofvolume}</td>
                      <td class="px-6 py-4">{item.fees}</td>

                      <td class="px-6 py-4 text-right">
                        <a
                          href="#"
                          class="font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={() => {
                            dispatch({
                              type: "DELETE_TARRIF",
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
      </div>

      <button
        onClick={() => {
          sendDataToDb();
          console.log(data);
        }}
        className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Terminé
      </button>
    </div>
  );
};

export default ShippingTarrifPart;
