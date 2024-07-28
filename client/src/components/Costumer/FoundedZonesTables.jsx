import React, { useEffect, useState } from "react";
import { PackageStepperContext } from "../../hooks/packageStepperContext";
import ShippingTypeui from "../forUi/shippingTypeui";

import AOS from "aos";
import "aos/dist/aos.css";

const FoundedZonesTables = ({ fragmentsList, error, loading }) => {
  const [shipment_fragments, setFragments] = useState({});
  const { data, dispatche } = PackageStepperContext();
  const HandlSelect = (e, from, to, index, lenght) => {
    let ind = index + 1;
    if (e.target.checked) {
      const check = data.shipment_fragments.filter(
        (item) => item.fromCity === from && item.toCity === to
      )[0];

      if (check) {
        dispatche({
          type: "DELETE_SHIPPMENT_FRAGMENT",
          id: check.ChosedTarrif,
        });
      }
      let hasNext = ind < lenght ? true : false;
      let hasPrevious = ind > 1;
      const fragmentObj = {
        fromCity: from,
        toCity: to,
        ChosedTarrif: e.target.value,
        position: ind,
        hasNext,
        hasPrevious,
      };
      setFragments(fragmentObj);

      dispatche({ type: "ADD_SHIPPMENT_FRAGMENT", newOne: fragmentObj });
    } else {
      dispatche({ type: "DELETE_SHIPPMENT_FRAGMENT", id: e.target.value });
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const checkIsChecked = (id) => {
    const check = data.shipment_fragments.filter(
      (item) => item.ChosedTarrif === id
    );

    if (check.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="relative shadow-md sm:rounded-lg w-full p-4">
      {error && (
        <div className="p-4 w-full bg-red-500 ">
          <p className="font-robot text-sm text-white">{error}</p>
        </div>
      )}

      {loading && (
        <div className="p-4 w-full bg-orange-500 ">
          <p className="font-robot text-sm text-white">cherching ........</p>
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

      {/* <div className="bg-orange-400 h-0.5 w-full"></div> */}

      {fragmentsList.map((item, index) => {
        return (
          <div className="w-full mb-6" key={index} data-aos="fade-up">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    chemin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3">
                    type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    jours estimés
                  </th>
                  <th scope="col" className="px-6 py-3">
                    unité
                  </th>
                  <th scope="col" className="px-6 py-3">
                    par Kg
                  </th>
                  <th scope="col" className="px-6 py-3">
                    tarifs
                  </th>
                  <th scope="col" className="px-6 py-3">
                    FRAIS DE ZONE
                  </th>
                </tr>
              </thead>

              {item.deliveryZone.map((zone, index3) => {
                return (
                  <tbody key={index3}>
                    {zone.shippingtariff.map((tarrif, index2) => {
                      return (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={index2}
                        >
                          <td className="px-6 py-4 ">
                            <p className="font-robot font-bold text-sm">
                              `{zone.from.name} to {zone.to.name}`
                            </p>
                          </td>
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap flex items-center "
                          >
                            <img
                              src={zone.delivery_service.Avatar}
                              alt="Avatar"
                              className="w-12 h-12 mr-2"
                            />
                            <p>{zone.delivery_service.businessname}</p>
                          </td>

                          <td className="px-6 py-4">
                            <ShippingTypeui
                              name={tarrif.shipping_type.typeOfshipping}
                            />
                          </td>

                          <td className="px-6 py-4">{zone.estimated_days}</td>

                          <td className="px-6 py-4">
                            {tarrif.cost_par_unit_ofvolume} DH
                          </td>
                          <td className="px-6 py-4">
                            {tarrif.price_par_kg} DH
                          </td>
                          <td className="px-6 py-4">{tarrif.fees} DH</td>
                          <td className="px-6 py-4">{zone.fees} DH</td>
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              name={`${index}path${index3}`}
                              value={tarrif._id}
                              checked={checkIsChecked(tarrif._id)}
                              onChange={(e) => {
                                HandlSelect(
                                  e,
                                  zone.from._id,
                                  zone.to._id,
                                  index,
                                  fragmentsList.length
                                );
                              }}
                            />
                          </td>
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
  );
};

export default FoundedZonesTables;
