import React, { useEffect, useState, useReducer } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Pagination from "../../components/admin/Pagination";
import TrTagOfTable from "../../components/admin/TrTagOfTable";
import SectionTitle from "../../components/SectionTitle";
import { ActionReq, GetUserReq } from "./fetchapi";
import AOS from "aos";
import "aos/dist/aos.css";

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: action.loading };
    case "ERROR":
      return { ...state, error: action.error };
    case "DONEIT":
      return { ...state, donemessage: action.donemessage };
    case "SETDATALENGHT":
      return { ...state, datalength: action.datalength };
    case "SETPAGE":
      return { ...state, page: action.page };
    case "SETTYPE":
      return { ...state, userType: action.usertype };
    case "SETUSERS":
      return { ...state, users: action.users };
    default:
      return state;
  }
};

const Listusers = () => {
  const [state, dispatch] = useReducer(Reducer, {
    loading: false,
    error: false,
    users: [],
    page: 1,
    datalength: 0,
    limit: 4,
    userType: "all",
    donemessage: false,
  });

  const getData = async () => {
    dispatch({ type: "LOADING", loading: true });
    try {
      const resp = await GetUserReq(state.page, state.limit, state.userType);

      const { status, message, List, total } = resp;

      if (status === "fail " || status === "error") {
        dispatch({ type: "ERROR", error: message });
      } else {
        dispatch({ type: "SETDATALENGHT", datalength: total });
        dispatch({ type: "SETUSERS", users: List });
        dispatch({ type: "ERROR", error: false });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", error: error });
    }
    dispatch({ type: "LOADING", loading: false });
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    getData();
  }, [state.page, state.userType]);

  const HandlAction = async (action, id, email) => {
    try {
      dispatch({ type: "LOADING", loading: true });
      const response = await ActionReq(action, id);
      console.log(response);
      dispatch({
        type: "DONEIT",
        donemessage: `Nous Avons Bien ${action} l'utilisateur ${email} `,
      });

      setTimeout(() => {
        dispatch({
          type: "DONEIT",
          donemessage: false,
        });
      }, 5000);

      await getData();
    } catch (error) {
      dispatch({ type: "ERROR", error: error });
    }
  };
  const HandleSearche = (text) => {
    // console.log(text);
    // if (text.length > 0) {
    //   const newdata = originaldata.filter((item) =>
    //     item.email.toUpperCase().includes(text.toUpperCase())
    //   );
    //   dispatch({ type: "SETUSERS", users: newdata });
    //   // setusers(newdata);
    // } else {
    //   dispatch({ type: "SETUSERS", users: originaldata });
    //   // setusers(originaldata);
    // }
  };
  // const handleFilter = (value) => {
  //   if (value === "all") {
  //     setusers(originaldata);
  //   } else {
  //     const newdata = originaldata.filter((item) => item.role === value);
  //     console.log(newdata);
  //     setusers(newdata);
  //   }
  // };

  return (
    <AdminLayout>
      <div className="w-3/4   flex flex-col justify-center items-center">
        <SectionTitle title={"La Liste De tous les utilisateurs "} />
        <div className="w-full flex justify-between items-center">
          <div
            data-aos="flip-left"
            data-aos-duration="2500"
            className="flex items-center mt-2 mb-6 w-1/3"
          >
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
          <div
            data-aos="flip-right"
            data-aos-duration="2500"
            className="w-40 mb-4 "
          >
            <select
              className="w-full border bg-white rounded px-3 py-2 outline-none"
              onChange={(e) => {
                dispatch({ type: "SETTYPE", usertype: e.target.value });
                dispatch({ type: "SETPAGE", page: 1 });
              }}
            >
              <option className="py-1 " value="all">
                ALL
              </option>
              <option className="py-1" value="user">
                Costumer
              </option>
              <option className="py-1" value="deliverycompanie">
                service de livraison
              </option>
            </select>
          </div>
        </div>
        {state.error && (
          <div className=" my-4 p-4 w-full font-Josefin text-white bg-red-400 rounded-lg">
            {state.error}
          </div>
        )}

        {state.donemessage && (
          <div className="p-4 my-4 w-full font-Josefin text-white bg-green-400 rounded-lg">
            {state.donemessage}
          </div>
        )}

        {state.loading ? (
          <div className="p-4 my-4 w-full font-Josefin text-white bg-orange-200 rounded-lg">
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
                {state.users?.map((item, index) => {
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
              nbtotal={state.datalength}
              dispatch={dispatch}
              page={state.page}
              limit={state.limit}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Listusers;
