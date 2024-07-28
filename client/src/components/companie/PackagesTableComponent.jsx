import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../hooks/Usercontext";
import StatusDivui from "../forUi/statusDivui";
import ShippingTypeui from "../forUi/shippingTypeui";

const PackagesTableComponent = ({ isOwner, forProfil, ownerid }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [user_Id, setUserId] = useState([]);
  //   let { userId } = useParams();
  const fetchAuthpackages = async () => {
    setLoading(true);
    if (user) {
      let response = await axios.get(
        `/packages/gestion/find/Delivery/packages/${user_Id}`
      );

      const { status, message, packagesList } = response.data;
      if (status === "successfully") {
        setData(packagesList);
        setLoading(false);
      } else {
        setError(message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isOwner && !forProfil) {
      if (user) setUserId(user._id);
    } else {
      setUserId(ownerid);
    }
    fetchAuthpackages();
  }, [user, user_Id]);

  const getHandledFragment = (index) => {
    const hfragment = data[
      index
    ].packageGroup.shipment[0].shipment_fragments.filter((item) => {
      return item.ChosedTarrif.delivery_zone.delivery_service._id === user_Id;
    })[0];
    const { dimensions } = data[0];
    const { cost_par_unit_ofvolume, fees, price_par_kg, price_par_km } =
      hfragment.ChosedTarrif;
    const zonefees = hfragment.ChosedTarrif.delivery_zone.fees;
    let toPay = zonefees + cost_par_unit_ofvolume + fees;
    return { ...hfragment, toPay };
  };

  const handChangeStatus = async (e, fragmentId) => {
    setLoading(true);
    const response = await axios.patch("/shipment/change/fragment/status", {
      newStatusId: e.target.value,
      fragmentId,
    });

    fetchAuthpackages();
    setLoading(false);
  };

  return (
    <div className="w-11/12 p-4">
      {loading && (
        <div className="w-full bg-orange-100 border-2 border-orange-500 p-4 rounded-md">
          <p className="text-black text-lg font-Bebas ">Loading ....</p>
        </div>
      )}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-4">
        <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              titre
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Route
            </th>

            <th scope="col" className="px-6 py-3">
              fragment
            </th>
            <th scope="col" className="px-6 py-3">
              Shipping Type
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              total
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={item._id}>
                <Link
                  to={
                    forProfil
                      ? `/admin/package/${item._id}`
                      : `/delivery/package/${item._id}`
                  }
                >
                  <td className="px-6  py-4 font-bold underline text-orange-400 ">
                    {item.title}
                  </td>
                </Link>
                <td className="px-6 py-4 font-bold">
                  {item.packageGroup.shipment[0].workflow.name}
                </td>

                <td className="px-6 py-4 font-bold">
                  {item.packageGroup.shipment[0].fromCity.name} to{" "}
                  {item.packageGroup.shipment[0].toCity.name}
                </td>
                <td className="px-6 py-4 font-bold">
                  {getHandledFragment(index).fromCity.name + " "}to
                  {" " + getHandledFragment(index).toCity.name}
                </td>
                <td className="px-6 py-4 font-bold ">
                  <ShippingTypeui
                    name={
                      getHandledFragment(index).ChosedTarrif.shipping_type
                        .typeOfshipping
                    }
                  />
                </td>

                {!forProfil ? (
                  <td className="px-6 py-4 font-bold ">
                    <select
                      name="status"
                      className="p-2"
                      onChange={(e) => {
                        handChangeStatus(e, getHandledFragment(index)._id);
                      }}
                    >
                      <option
                        value={
                          getHandledFragment(index).currentstatus.status._id
                        }
                      >
                        {getHandledFragment(index).currentstatus.status.name}
                      </option>
                      {getHandledFragment(
                        index
                      ).currentstatus.next_possible_status.map((item) => {
                        return (
                          <option value={item._id}>{item.status.name}</option>
                        );
                      })}
                    </select>
                  </td>
                ) : (
                  <StatusDivui
                    label={getHandledFragment(index).currentstatus.status.name}
                  />
                )}

                <td className="px-6 py-4 font-bold ">
                  {getHandledFragment(index).toPay}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PackagesTableComponent;
