import axios from "axios";
import React, { useState, useEffect } from "react";
import FindZonesForm from "../Costumer/findZonesForm";
import ShippingTypeui from "../forUi/shippingTypeui";
import AdminLayout from "./AdminLayout";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminFindPath = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fragmentsList, setFragments] = useState([]);
  const findPath = async (from, to) => {
    setLoading(true);
    setFragments([]);
    const response = await axios.post("/packages/gestion/findpackageRoute", {
      from,
      to,
    });
    const { status, path } = response.data;

    if (status === "successfully") {
      if (path[0].length !== 1) setFragments(path[0].reverse());
      else setFragments(path[0].reverse());
    } else {
      setError("Désolé, nous avons trouvé aucune route pour votre colis");
      setFragments([]);
    }
    setLoading(false);

    setTimeout(() => {
      setError(false);
      // setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full  p-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="bg-orange-400 h-0.5 w-3/4"></div>
        </div>
        <div className="bg-white w-10/12 p-4 shadow-md  rounded-sm mt-4 flex flex-col justify-center items-center">
          {/* Forms       */}
          <div className="w-full" data-aos="zoom-in" data-aos-duration="2000">
            <FindZonesForm findPath={findPath} />
          </div>

          {/* Data Table */}
          <div class="relative  shadow-md sm:rounded-lg w-full">
            {error && (
              <div className="p-4 w-full bg-red-500 ">
                <p className="font-robot text-sm text-white">{error}</p>
              </div>
            )}

            {loading && (
              <div className="p-4 w-full bg-orange-500 ">
                <p className="font-robot text-sm text-white">
                  Attendez vous ......
                </p>
              </div>
            )}
            <div className="w-full flex justify-start items-center m-4">
              {fragmentsList.map((item, index) => {
                return (
                  <div>
                    <p className="mr-2 font-Josefin font-bold">{`${item.deliveryZone[0].from.name} to ${item.deliveryZone[0].to.name}`}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-orange-400 h-0.5 w-full"></div>

            {fragmentsList.map((item, index) => {
              return (
                <div className="w-full mb-6" key={index} data-aos="zoom-out">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Route
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Service
                        </th>
                        <th scope="col" class="px-6 py-3">
                          type
                        </th>
                        <th scope="col" class="px-6 py-3">
                          days
                        </th>
                        <th scope="col" class="px-6 py-3">
                          unit
                        </th>
                        <th scope="col" class="px-6 py-3">
                          par Kg
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Tariff fees
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Zone fees
                        </th>
                      </tr>
                    </thead>

                    {item.deliveryZone.map((zone, indes) => {
                      return (
                        <tbody>
                          {zone.shippingtariff.map((tarrif, index2) => {
                            return (
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="px-6 py-4 ">
                                  <p className="font-robot font-bold text-sm">
                                    `{zone.from.name} to {zone.to.name}`
                                  </p>
                                </td>
                                <td
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap flex items-center "
                                >
                                  <img
                                    src={zone.delivery_service.Avatar}
                                    alt="Tailwind"
                                    className="w-12 h-12 mr-2"
                                  />
                                  <p>{zone.delivery_service.businessname}</p>
                                </td>

                                <td class="px-6 py-4">
                                  {/* {tarrif.shipping_type.typeOfshipping} */}
                                  <ShippingTypeui
                                    name={tarrif.shipping_type.typeOfshipping}
                                  />
                                </td>

                                <td class="px-6 py-4">
                                  {zone.estimated_days} DH
                                </td>

                                <td class="px-6 py-4">
                                  {tarrif.cost_par_unit_ofvolume} DH
                                </td>
                                <td class="px-6 py-4">
                                  {tarrif.price_par_kg} DH
                                </td>
                                <td class="px-6 py-4">{tarrif.fees} DH</td>
                                <td class="px-6 py-4">{zone.fees} DH</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFindPath;
