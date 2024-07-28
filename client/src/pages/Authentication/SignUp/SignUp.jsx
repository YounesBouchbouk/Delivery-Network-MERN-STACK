import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import AppStyledInput from "../../../components/AppStyledInput";
import { signupReq } from "../fetchapi";
import assets from "../../../data/assets";
import Layout from "../Layout";
import * as Yup from "yup";
import axios from "axios";

export const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  businessname: Yup.string().min(3, "Invalid name!"),
  businessAdress: Yup.string().min(5, "invalid Adress"),
  phone: Yup.number().min(9, "invalid phone number"),
  password: Yup.string().min(3, "Invalid password!"),
});

const SignUp = () => {
  const [isCompanie, setIsComany] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Agadir");
  const [Listcity, setLsitCity] = useState([]);

  const userInfo = {
    fullname: "",
    email: "",
    businessname: "",
    businessAdress: "",
    phone: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/cityandcountry/get/city/all");
      const { cities } = response.data;
      setLsitCity(cities);
    };
    fetchData();
  }, []);

  const handlsubmit = async (values, formikActions) => {
    // console.log(values);
    // console.log(isCompanie);

    let UserObj = {
      name: values.fullname,
      email: values.email,
    };

    if (isCompanie) {
      UserObj = {
        ...UserObj,
        role: "deliverycompanie",
        phone: [values.phone],
        businessname: values.businessname,
        headquarter: {
          Adress: values.businessAdress,
          city,
        },
      };
    }

    setLoading(true);

    try {
      const response = await signupReq(UserObj);
      const { status, message, data } = response;

      if (status === "success") {
        setDone(
          "votre inscription et bien effectué , un lien et bien envoyé a votre email adress  s'il vous plais confirm votre email "
        );
        //console.log(data);
      } else {
        setError(message);
        setTimeout(() => {
          setError(null);
        }, 7000);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Layout image={assets.bg2} href={"/login"} label="se connecter ">
      <div className="w-3/4 bg-white p-4 flex flex-col items-center justify-center">
        <h2
          className="font-bold text-2xl first-letter:uppercase font-mono"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          S'indentifier
        </h2>
        <div className="h-0.5 w-1/4 bg-orange-300"></div>
        {error && (
          <div className="flex justify-center items-center mt-2">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* {done && (
            <div className="flex justify-center items-center p-1 bg-green-500 rounded-md">
              <p className="text-sm text-white font-robot">{done}</p>
            </div>
          )} */}

        {loading && (
          <div className="flex justify-center items-center  p-4  rounded-md">
            <p className="text-sm text-black font-robot">Entrain .....</p>
          </div>
        )}

        {done ? (
          <div className="flex justify-center items-center p-4 bg-green-500 rounded-md">
            <p className="text-sm text-white font-bold font-robot">{done}</p>
          </div>
        ) : (
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={handlsubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              handleBlur,
              touched,
            }) => {
              return (
                <div className="w-full">
                  <div
                    className="pt-2"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                  >
                    {/* <span className="uppercase text-sm text-gray-600 font-bold ">
                Votre Nom :
              </span> */}
                    <AppStyledInput
                      error={touched.fullname && errors.fullname}
                      value={values.fullname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="fullname"
                      placeholder="Nom complete"
                    />
                  </div>
                  <div
                    className="pt-2"
                    data-aos="fade-left"
                    data-aos-duration="1500"
                  >
                    <AppStyledInput
                      error={touched.email && errors.email}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      name="email"
                      placeholder="Email address"
                    />
                  </div>
                  <div
                    className="pt-2 flex items-center justify-center"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                  >
                    <span className="uppercase text-sm text-gray-600 font-bold w-1/2">
                      Vous etes ?
                    </span>
                    <select
                      name="type"
                      className="w-full  border-2 text-gray-900 mt-2 p-3 px-4 active:outline-1"
                      onChange={(e) => {
                        setIsComany(!isCompanie);
                      }}
                    >
                      <option value="costumer">Costumer</option>
                      <option value="Delivery">Delivery Service</option>
                    </select>
                  </div>
                  {isCompanie && (
                    <div>
                      <div
                        className="pt-2"
                        data-aos="fade-left"
                        data-aos-duration="1500"
                      >
                        <AppStyledInput
                          error={touched.businessname && errors.businessname}
                          value={values.businessname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          name="businessname"
                          placeholder="Nom de l'entreprise"
                        />
                      </div>

                      <div
                        className="pt-2"
                        data-aos="fade-right"
                        data-aos-duration="1500"
                      >
                        <AppStyledInput
                          error={
                            touched.businessAdress && errors.businessAdress
                          }
                          value={values.businessAdress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          name="businessAdress"
                          placeholder="Address"
                        />
                      </div>

                      <div className="pt-2 flex w-full">
                        <div
                          className="w-2/3 pr-2"
                          data-aos="fade-left"
                          data-aos-duration="1500"
                        >
                          <AppStyledInput
                            error={touched.phone && errors.phone}
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="phone"
                            name="phone"
                            placeholder="Telephone"
                          />
                        </div>

                        <div
                          className="flex items-center justify-center w-1/3"
                          data-aos="fade-right"
                          data-aos-duration="1500"
                        >
                          {/* <span className="uppercase text-sm text-gray-600 font-bold w-1/3">
                            Ville :
                          </span> */}
                          <select
                            name="city"
                            className="w-full  border-2 text-gray-900 mt-2 p-3 px-4 active:outline-1"
                            onChange={(e) => {
                              //console.log(e.target.value);
                              setCity(e.target.value);
                            }}
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
                      </div>
                    </div>
                  )}
                  <div
                    className="mt-4 flex flex-col justify-center items-center "
                    data-aos="fade-left"
                    data-aos-duration="1500"
                  >
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="uppercase  text-sm font-bold tracking-wide bg-orange-200 hover:bg-orange-400 shadow-md cursor-pointer text-gray-100 p-3 rounded-full w-3/4 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs focus:shadow-outline flex justify-center"
                    >
                      Envoye
                      {/* <FaHandHoldingHeart className="text-lg " /> */}
                    </button>
                  </div>
                </div>
              );
            }}
          </Formik>
        )}

        <div className="mt-4">
          <span className="text-sm font-bold">
            Vous avez deja une Compte ?
            <Link
              to={"/Login"}
              className="text-blue-600 ml-2 hover:underline hover:font-bold"
            >
              S'econnecter
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
