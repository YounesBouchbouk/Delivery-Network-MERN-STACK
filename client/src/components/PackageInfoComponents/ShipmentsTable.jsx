import React from "react";
import ShippingTypeui from "../forUi/shippingTypeui";
import StatusDivui from "../forUi/statusDivui";

const ShipmentsTable = ({
  shipment_fragments,
  loading,
  amout,
  currentstatus,
  foradmin,
  forCompanie,
  forUser,
}) => {
  return (
    <div className="w-full p-4 ">
      {loading && (
        <div className="text-center font-robot text-orange-400 p-4 w-full">
          Loading data ....
        </div>
      )}

      {/* <button
        onClick={() => {
          console.log(shipment_fragments);
        }}
      >
        {" "}
        Onckick
      </button> */}

      <div className="p-2 flex flex-row-reverse ">
        <div className="flex flex-row-reverse justify-center items-center ">
          <div className="px-4 py-1 ml-5 flex items-center justify-center font-Bebas   rounded-md">
            <StatusDivui label={currentstatus} />
          </div>
          <div className="uppercase font-robot">Current Status :</div>
        </div>
      </div>

      {!loading && (
        <div className="w-full">
          {shipment_fragments?.map((item, index) => {
            return (
              <div className="w-full mb-6" key={index}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-4">
                  <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Route
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Etat
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3">
                        type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        days
                      </th>
                      <th scope="col" className="px-6 py-3">
                        unit
                      </th>
                      <th scope="col" className="px-6 py-3">
                        par Kg
                      </th>
                      <th scope="col" className="px-6 py-3">
                        par Km
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tariff fees
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Zone fees
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 ">
                        <p className="font-robot font-bold text-sm">
                          `
                          {item.fromCity.name +
                            " " +
                            "to" +
                            " " +
                            item.toCity.name}
                          `
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        {/* {item.currentstatus.status.name} */}
                        <StatusDivui label={item.currentstatus.status.name} />
                      </td>

                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap flex items-center "
                      >
                        <img
                          src={
                            item.ChosedTarrif.delivery_zone.delivery_service
                              .Avatar
                          }
                          alt="Tailwind"
                          className="w-12 h-12 mr-2"
                        />
                        <p>
                          {
                            item.ChosedTarrif.delivery_zone.delivery_service
                              .businessname
                          }
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <ShippingTypeui
                          name={item.ChosedTarrif.shipping_type.typeOfshipping}
                        />
                      </td>

                      <td className="px-6 py-4">
                        {item.ChosedTarrif.delivery_zone.estimated_days}
                      </td>

                      <td className="px-6 py-4">
                        {item.ChosedTarrif.cost_par_unit_ofvolume}
                      </td>
                      <td className="px-6 py-4">
                        {item.ChosedTarrif.price_par_kg}
                      </td>

                      <td className="px-6 py-4">
                        {item.ChosedTarrif.price_par_km}
                      </td>
                      <td className="px-6 py-4">
                        {item.ChosedTarrif.delivery_zone.fees}
                      </td>
                      <td className="px-6 py-4">{item.ChosedTarrif.fees}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
          <div className="bg-black h-0.5  w-full"></div>

          <div className="grid grid-cols-4">
            <div className="col-span-2"></div>
            <div className="col-span-1 items-end justify-items-end text-right p-2">
              Total :
            </div>
            <div className="col-span-1 items-end justify-items-end bg-slate-100  text-right font-bold p-2">
              {amout} MAD
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentsTable;
