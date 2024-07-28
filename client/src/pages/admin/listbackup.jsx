import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Pagination from "../../components/admin/Pagination";
import TrTagOfTable from "../../components/admin/TrTagOfTable";
import SectionTitle from "../../components/SectionTitle";
import { ActionReq, GetUserReq } from "./fetchapi";

const Listusers = () => {
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setusers] = useState([]);
  const [originaldata, setOriginaldata] = useState([]);
  const [page, setPage] = useState(1);
  const [datalength, setDatalength] = useState(0);
  const [limit, setlimit] = useState(4);
  const [userType, setuserType] = useState("all");
  const getData = async () => {
    isLoading(true);
    try {
      const resp = await GetUserReq(page, limit, userType);

      const { status, message, List, total } = resp;

      if (status === "fail " || status === "error") {
        setError(message);
      } else {
        setDatalength(total);
        setusers(List);
        setOriginaldata(List);
        setError(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    isLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page, userType]);

  const HandlAction = async (action, id) => {
    try {
      isLoading(true);
      const response = await ActionReq(action, id);
      console.log(response);
      await getData();
    } catch (error) {}
  };
  const HandleSearche = (text) => {
    if (text.length > 0) {
      const newdata = originaldata.filter((item) =>
        item.email.toUpperCase().includes(text.toUpperCase())
      );
      setusers(newdata);
    } else {
      setusers(originaldata);
    }
  };
  const handleFilter = (value) => {
    if (value === "all") {
      setusers(originaldata);
    } else {
      const newdata = originaldata.filter((item) => item.role === value);
      setusers(newdata);
    }
  };

  return (
    <AdminLayout>
      <div className="w-3/4   flex flex-col justify-center items-center">
        <SectionTitle title={"La Liste De tout les utilisateur "} />
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center mt-2 mb-6 w-1/3">
            <svg
              className="w-4 h-4 fill-current text-gray-500 ml-4 z-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              onChange={(e) => {
                HandleSearche(e.target.value);
              }}
              type="text"
              placeholder="chercher un utilisateur"
              className="w-full -ml-8 pl-10 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="w-24 mb-4 ">
            <select
              className="w-full border bg-white rounded px-3 py-2 outline-none"
              onChange={(e) => {
                setuserType(e.target.value);
                setPage(1);
              }}
            >
              <option className="py-1 " value="all">
                All
              </option>
              <option className="py-1" value="user">
                Costumer
              </option>
              <option className="py-1" value="deliverycompanie">
                Company
              </option>
            </select>
          </div>
        </div>
        {error && (
          <div className="p-4 w-full font-Josefin text-white bg-red-400 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-4 w-full font-Josefin text-white bg-orange-200 rounded-lg">
            Attendez s'il vous plait ...
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nom :
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email :
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date d'inscription
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => {
                  return (
                    <TrTagOfTable
                      key={index}
                      user={item}
                      HandlAction={HandlAction}
                    />
                  );
                })}
              </tbody>
            </table>
            <Pagination
              nbtotal={datalength}
              setPage={setPage}
              page={page}
              limit={limit}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Listusers;
