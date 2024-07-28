import axios from "axios";
import React, { useState, useEffect } from "react";
import { useStepperContext } from "../../../hooks/stepsContext";
import AOS from "aos";
import "aos/dist/aos.css";

const MoreAdresses = () => {
  const { data, dispatche } = useStepperContext();
  const [NewAdress, setAdress] = useState({
    Street: "",
    city: "",
    zipCode: "",
    index: 0,
  });
  const [Listcity, setLsitCity] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/cityandcountry/get/city/all");
      const { cities } = response.data;
      setLsitCity(cities);
    };
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // const [ListAdress, setListAdress] = useState([]);
  const HandlClick = () => {
    setAdress({ ...NewAdress, index: data.adresses.length + 1 });
    // setListAdress([...ListAdress, adress]);
    dispatche({ type: "ADD_ADRESS", adress: NewAdress });
  };
  return (
    <div className="w-full p-4 " data-aos="fade-left">
      <p className="mx-4 mb-6">
        Vous pouvez ajouter plusieurs adresse local de votre societé .
        <br />{" "}
        <span className="font-bold">Vous pouvez ignoré cette étape </span> :
      </p>
      <div className="flex flex-col lg:flex-row  w-full">
        <div className="grid w-full grid-cols-1 xl:gap-6 lg:w-1/2 p-2">
          <div class="relative z-0 w-full mb-4 lg:mb-2   group">
            <input
              type="text"
              name="Street"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setAdress({ ...NewAdress, [e.target.name]: e.target.value });
                console.log(data);
                // dispatche({ type: "AFFICHE_DATA" });
              }}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Rue & Quartier
            </label>
          </div>
          <div class="relative z-0 w-full mb-4 lg:mb-2  group">
            <select
              onChange={(e) => {
                setAdress({ ...NewAdress, [e.target.name]: e.target.value });
              }}
              name="city"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            >
              <option value="">Ville</option>

              {Listcity?.map((item) => {
                return (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="relative z-0 w-full mb-4 lg:mb-2  group">
            <input
              type="text"
              name="zipCode"
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=""
              required
              onChange={(e) => {
                setAdress({ ...NewAdress, [e.target.name]: e.target.value });
              }}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Code Postal
            </label>
          </div>

          <div class="relative z-0 w-full mb-4 lg:mb-2  group">
            <button
              onClick={() => {
                HandlClick();
                // dispatche({ type: "AFFICHE_DATA" });
              }}
              type="button"
              class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
            >
              Ajouté
            </button>
          </div>
        </div>

        {/* Adress table must added it in ather component  */}

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-1/2 p-2">
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
    </div>
  );
};

export default MoreAdresses;
