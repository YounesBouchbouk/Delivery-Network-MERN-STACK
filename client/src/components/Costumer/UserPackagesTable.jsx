import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/Usercontext";
import axios from "axios";
import SectionTitle from "../SectionTitle";
import StatusDivui from "../forUi/statusDivui";
import AOS from "aos";
import "aos/dist/aos.css";

const UserPackagesTable = ({ ownerid, forProfil, isOwner }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [user_Id, setUserId] = useState([]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (isOwner && !forProfil) {
      if (user) setUserId(user._id);
    } else {
      setUserId(ownerid);
    }
    const fetchAuthpackages = async () => {
      if (user) {
        let response = await axios.get(
          `/packages/gestion/getUser/package/${user_Id}`
        );
        const { status, message, packages } = response.data;
        if (status === "successfully") {
          setData(packages);
          setLoading(false);
          setError(false);
        } else {
          setError(message);
        }
      }
    };

    setLoading(true);
    fetchAuthpackages();
  }, [user, user_Id, forProfil, isOwner, ownerid]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <SectionTitle title={"Packages List"} />
      <div className="bg-white w-11/12 p-4 shadow-sm  mt-4 flex flex-col justify-center items-center">
        {/* Forms       */}
        {error && (
          <div className="p-4 w-full bg-red-500 ">
            <p className="font-robot text-sm text-white">{error}</p>
          </div>
        )}
        {loading && (
          <div className="text-center font-robot text-orange-400 p-4 w-full">
            Loading data ....
          </div>
        )}

        {/* Data Table */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                titre
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                route
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                total
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr key={item._id} data-aos="fade-up">
                  <Link
                    to={
                      forProfil
                        ? `/admin/package/${item._id}`
                        : `/user/package/${item._id}`
                    }
                  >
                    <td className="px-6  py-4 font-bold underline text-orange-400 ">
                      {item.title}
                    </td>
                  </Link>

                  <td className="px-6 py-4 font-bold">{item.description}</td>
                  <td className="px-6 py-4 font-bold">
                    {item.packageGroup.shipment[0].fromCity.name} to{" "}
                    {item.packageGroup.shipment[0].toCity.name}
                  </td>
                  <td className="px-6 py-4 font-bold ">
                    <StatusDivui
                      label={item.packageGroup.shipment[0].status.status.name}
                    />
                  </td>

                  <td className="px-6 py-4 font-bold ">{item.amout}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <button
          onClick={() => {
            console.log(data);
          }}
        >
          CheckData
        </button> */}
      </div>
    </div>
  );
};

export default UserPackagesTable;
