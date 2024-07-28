import axios from "axios";
import React, { useEffect, useReducer } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardDeliveryTable from "../../components/admin/DashboardDeliveryTable";
import Cities from "../../components/admin/DashboardGrids/Cities";
import Countries from "../../components/admin/DashboardGrids/Countries";
import Courency from "../../components/admin/DashboardGrids/Courency";
import Chart from "../../components/charts/Chart1";
import Last7days from "../../components/charts/Last7days";
import AnimatedNubmer from "../../components/forUi/AnimatedNubmer";
import SectionTitle from "../../components/SectionTitle";
import AOS from "aos";
import "aos/dist/aos.css";

const Reducer = (state, action) => {
  switch (action.type) {
    case "GET_CITIES":
      return { ...state, cities: action.cities };
    case "GET_COUNTRIES":
      return { ...state, countries: action.count };
    case "GET_CNT":
      return { ...state, countries: action.count };
    case "GET_COURENCIES":
      return { ...state, currencies: action.currencies };
    case "SETDATALENGHT":
      return {
        ...state,
        citiespagination: {
          ...state.citiespagination,
          dataLenght: action.dataLength,
        },
      };
    case "SETPAGE":
      return {
        ...state,
        citiespagination: {
          ...state.citiespagination,
          page: action.page,
        },
      };
    case "SET_TYPE":
      return { ...state, filterByCountry: action.filterByCountry };
    case "SET_CITIES_DATA_LEGHT":
      return {
        ...state,
        citiespagination: {
          ...state.citiespagination,
          dataLenght: action.lenght,
        },
      };
    case "SET_STATISTIQUES":
      return { ...state, statistique: action.analitycs };
    default:
      return state;
  }
};

const AdminDashboard = () => {
  const [state, dispatch] = useReducer(Reducer, {
    cities: [],
    countries: [],
    currencies: [],
    filterByCountry: "all",
    statistique: {
      nbColies: 0,
      nbColiesLivred: 0,
      nbservices: 0,
      nbcostumers: 0,
      nbFragments: 0,
      todayPackages: 0,
    },
    citiespagination: {
      dataLenght: 0,
      page: 1,
      limit: 2,
    },
    countriespagination: {
      page: 1,
      limit: 2,
    },
  });

  const getCountries = async () => {
    const response = await axios.get("/cityandcountry/get/country/all");
    console.log(response.data.countries);
    dispatch({ type: "GET_COUNTRIES", count: response.data.countries });
    // setCountries(response.data.countries);
  };
  const getCities = async () => {
    let Url = "";
    if (state.filterByCountry === "all") {
      Url = `/cityandcountry/get/city/all?page=${state.citiespagination.page}&limit=${state.citiespagination.limit}`;
    } else {
      Url = `/cityandcountry/get/city/all?in_country=${state.filterByCountry}&page=${state.citiespagination.page}&limit=${state.citiespagination.limit}`;
    }

    const response = await axios.get(Url);
    console.log(response);
    // console.log();
    dispatch({ type: "GET_CITIES", cities: response.data.cities });
    dispatch({ type: "SET_CITIES_DATA_LEGHT", lenght: response.data.nbTotal });

    // setCities(response.data.cities);
  };

  const getCourrency = async () => {
    const response = await axios.get("/foradmin/getAll/currency");
    dispatch({
      type: "GET_COURENCIES",
      currencies: response.data.ListCurrency,
    });
    // setCurrencies(response.data.ListCurrency);
  };

  const getStatistiques = async () => {
    const response = await axios.get("/foradmin/get/statistique");
    const { analitycs } = response.data;

    dispatch({ type: "SET_STATISTIQUES", analitycs });
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    getCourrency();
    getCountries();
    getStatistiques();
    getCities();
  }, [state.citiespagination.page, state.filterByCountry]);
  return (
    <AdminLayout>
      <div className="w-full bg-slate-50 p-4 ">
        <SectionTitle title={"Dashboard"} />
        <div className="grid grid-cols-1 md:grid-cols-3 my-2">
          <div
            data-aos="fade-down-right"
            data-aos-duration="2000"
            className="col-span-1 bg-white shadow-md p-2 mx-2"
          >
            <div className="p-1 flex items-center justify-start">
              <p className="text-sm uppercase font-robot text-slate-600">
                Nombre total des colie :{" "}
              </p>
            </div>

            <div className="p-1 flex items-center justify-end">
              {/* <p className="text-6xl font-bold font-robot text-black">
                {state.statistique.nbColies}
              </p> */}
              <AnimatedNubmer
                value={state.statistique.nbColies}

                // formatValue={(n) => prettyBytes(n)}
              />
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="col-span-1 bg-white shadow-md p-2 mx-2"
          >
            <div className="p-1 flex items-center justify-start">
              <p className="text-sm uppercase font-robot text-slate-600">
                Nombre des colie Livré :{" "}
              </p>
            </div>

            <div className="p-1 flex items-center justify-end">
              {/* <p className="text-6xl font-bold font-robot text-black">
                {state.statistique.nbColiesLivred}
              </p> */}
              <AnimatedNubmer value={state.statistique.nbColiesLivred} />
            </div>
          </div>

          <div
            data-aos="fade-down-left"
            data-aos-duration="2000"
            className="col-span-1 bg-white shadow-md p-2 mx-2"
          >
            <div className="p-1 flex items-center justify-start">
              <p className="text-sm uppercase font-robot text-slate-600">
                service de laivraison:
              </p>
            </div>

            <div className="p-1 flex items-center justify-end">
              <AnimatedNubmer value={state.statistique.nbservices} />
            </div>
          </div>

          <div
            data-aos="fade-down-right"
            data-aos-duration="2000"
            className="col-span-1 bg-white shadow-md p-2 m-2"
          >
            <div className="p-1 flex items-center justify-start">
              <p className="text-sm uppercase font-robot text-slate-600">
                cotumers:
              </p>
            </div>

            <div className="p-1 flex items-center justify-end">
              {/* <p className="text-6xl font-bold font-robot text-black">
                {" "}
                {state.statistique.nbcostumers}
              </p> */}
              <AnimatedNubmer value={state.statistique.nbcostumers} />
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="col-span-1 bg-white shadow-md p-2 m-2"
          >
            <div className="p-1 flex items-center justify-start">
              <p className="text-sm uppercase font-robot text-slate-600">
                fragments :
              </p>
            </div>

            <div className="p-1 flex items-center justify-end">
              {/* <p className="text-6xl font-bold font-robot text-black">
                {state.statistique.nbFragments}
              </p> */}
              <AnimatedNubmer value={state.statistique.nbFragments} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 my-2">
          <div
            data-aos="flip-left"
            data-aos-duration="2000"
            className="col-span-1 bg-white shadow-md p-2 mx-2"
          >
            <Chart />
          </div>

          <div
            data-aos="flip-right"
            data-aos-duration="2000"
            className="col-span-1 bg-white shadow-md p-2 mx-2"
          >
            <Last7days />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 my-2">
          <div className="col-span-1 bg-white shadow-md p-2 mx-2"></div>

          <div className="col-span-1 bg-white shadow-md p-2 mx-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 my-2">
          <div
            className="col-span-1 bg-white shadow-md p-2 mx-2"
            data-aos="zoom-out-down"
            data-aos-duration="2000"
          >
            <DashboardDeliveryTable />
          </div>

          {/* <div className="col-span-1 bg-white shadow-md p-2 mx-2"></div> */}
        </div>

        <div className="w-full grid">
          <div
            className="grid grid-cols-1 lg:grid-cols-3"
            data-aos="zoom-out-up"
            data-aos-duration="2500"
          >
            {/* County Grig */}
            <Countries
              contries={state.countries}
              getCountries={getCountries}
              getCities={getCities}
              dispatch={dispatch}
            />

            {/* Cities Grid */}
            <Cities
              cities={state.cities}
              pagination={state.citiespagination}
              contries={state.countries}
              getCities={getCities}
              dispatch={dispatch}
            />

            <Courency
              currencies={state.currencies}
              getCourrency={getCourrency}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
