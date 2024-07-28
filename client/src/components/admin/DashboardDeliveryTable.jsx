import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardDeliveryTable = () => {
  const [services, setServices] = useState([]);
  const getData = async () => {
    const response = await axios.get(
      "/user/disabledusers?role=deliverycompanie"
    );
    const { List } = response.data;
    setServices(List);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <p className="text-sm font-robot m-1">Services de laivraison : </p>
      <div className="bg-orange-300 h-0.5"></div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Avatar
            </th>
            <th scope="col" class="px-6 py-3">
              Service Name
            </th>
            <th scope="col" class="px-6 py-3">
              Numero de Telephone :
            </th>
          </tr>
        </thead>
        <tbody>
          {services?.map((item, index) => {
            return (
              <tr
                key={item._id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  <img
                    src={item.Avatar}
                    alt={item.businessname}
                    width={50}
                    height={50}
                  />
                </th>

                <td class="px-6 py-4">{item.businessname}</td>
                <td class="px-6 py-4">{item.phone[0]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardDeliveryTable;
