import React, { useState, useEffect } from "react";
import AppStyledInput from "./AppStyledInput";
import * as Yup from "yup";
import { Formik } from "formik";
import SectionTitle from "./SectionTitle";
import ServicesDashboard from "../pages/Companie/ServicesDashboard";
import { useParams } from "react-router-dom";
import PackagesTableComponent from "./companie/PackagesTableComponent";
import UserPackagesTable from "./Costumer/UserPackagesTable";
import ImageCmp from "./ImageCmp";
import AOS from "aos";
import "aos/dist/aos.css";

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!"),
  businessname: Yup.string().min(3, "Invalid name!"),
  businessAdress: Yup.string().min(5, "invalid Adress"),
  phone: Yup.number().min(9, "invalid phone number"),
  password: Yup.string().min(3, "Invalid password!"),
  passwordConfirm: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

function getKey(dys) {
  const arr = [],
    obj = Object.keys(dys);
  for (var x in obj) {
    if (dys[obj[x]] === true) {
      arr.push(obj[x]);
    }
  }
  return arr;
}

const ProfilComponent = ({
  isfor,
  data,
  isloading,
  isOwner,
  formdata,
  handlsubmit,
  setCity,
  error,
  done,
  fetchData,
}) => {
  const {
    name,
    email,
    Avatar,
    headquarter,
    businessname,
    phone,
    CreatedAt,
    moreAdress,
    workingDays,
  } = data;

  const { userId } = useParams();
  const [photo, setPhoto] = useState({});
  let workingDaysListe = [];
  if (workingDays) workingDaysListe = getKey(workingDays);

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        {/* <!-- Left Side --> */}
        <div data-aos="flip-left" className="w-full md:w-3/12 md:mx-2">
          {/* <!-- Profile Card --> */}
          <div className="bg-white p-3 border-t-4 border-orange-300">
            <div className="image overflow-hidden">
              {/* <img className="h-auto w-full mx-auto" src="" alt="" /> */}
              <ImageCmp
                handlePhoto={handlePhoto}
                // handlSubmit={handlsubmit}
                currentImg={Avatar}
                photo={photo}
                fetchData={fetchData}
                userId={userId}
                isOwner={isOwner}
              />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {name}
            </h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">
              Role : {isfor}
            </h3>

            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
              {isfor === "admin" ? null : (
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">{CreatedAt}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="my-4"></div>
        </div>
        {/* <!-- Right Side --> */}
        <div className="w-full md:w-9/12 mx-2 h-64">
          <SectionTitle title={!isOwner ? `${name} Profil` : "Mon Profil"} />
          {/* <!-- Profile tab --> */}
          {/* <!-- About Section --> */}
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div
              data-aos="flip-right"
              className="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
            >
              <span className="text-orange-300">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokelinejoin="round"
                    strokewidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>

            <div data-aos="flip-right" className="text-gray-700">
              <div className="grid md:grid-cols-3 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Nome : </div>
                  <div className="px-4 py-2">{name}</div>
                </div>

                {/* <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Gender</div>
                  <div className="px-4 py-2">Female</div>
                </div> */}
                {/* <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">+11 998001001</div>
                </div> */}

                {isfor === "deliverycompanie" && (
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Numéro de Téléphone :
                    </div>
                    <div className="px-4 py-2 flex flex-col justify-center items-center">
                      {phone.map((ph) => {
                        return <p>{ph} ,</p>;
                      })}
                    </div>
                  </div>
                )}

                {isfor === "deliverycompanie" && (
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Nom d'entrprise :
                    </div>
                    <div className="px-4 py-2">{businessname}</div>
                  </div>
                )}

                {isfor === "deliverycompanie" && (
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">{headquarter.Adress}</div>
                  </div>
                )}

                {isfor === "deliverycompanie" && (
                  <div className="grid grid-cols-3">
                    <div className="px-4 py-2 font-semibold">Ville :</div>
                    <div className="px-4 py-2">{headquarter.city}</div>
                    <div className="px-4 py-2">{headquarter.zipCode}</div>
                  </div>
                )}

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email.</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </div>
                </div>

                {isfor === "deliverycompanie" && (
                  <div className="grid col-span-3  grid-cols-3 ">
                    <div className="px-4 py-2 col-span-1 font-semibold flex justify-center  items-center">
                      Working Days :
                    </div>
                    <div className="px-4 col-span-2 py-2">
                      <div className="flex justify-center items-center ">
                        {workingDaysListe?.map((item) => {
                          return (
                            <div className="px-4 py-1 flex justify-center">
                              <p className="mr-2">{item}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {isfor === "deliverycompanie" && moreAdress.length !== 0 && (
                  <div className="grid col-span-3 grid-cols-3">
                    {moreAdress.map((item) => {
                      return (
                        <div className="col-span-1 p-2 relative">
                          <div className="w-full flex">
                            <p className="mr-3 font-bold">Rue :</p>
                            <p>{item.Street}</p>
                          </div>
                          <div className="w-full flex">
                            <p className="mr-3 font-bold">Ville :</p>
                            <p>{item.city}</p>
                          </div>
                          <div className="w-full flex">
                            <p className="mr-3 font-bold">Postal :</p>
                            <p>{item.zipCode}</p>
                          </div>

                          {isOwner && (
                            <div className="p-2 absolute top-0 right-20">
                              <button className="text-red-500">D</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <!-- End of about section --> */}
          <div className="my-4"></div>

          {isOwner ? (
            <div data-aos="zoom-in" className="w-full my-4">
              <SectionTitle title={"Modification : "} />

              {error && (
                <div className="flex justify-center items-center p-2 bg-red-500">
                  <p className="text-sm text-white font-Josefin">{error}</p>
                </div>
              )}
              {done && (
                <div className="flex justify-center items-center p-2 bg-green-500">
                  <p className="text-sm text-white font-Josefin">{done}</p>
                </div>
              )}

              {isloading && (
                <div className="flex justify-center items-center">
                  <p className="text-sm text-black font-Josefin">
                    Entrain ....
                  </p>
                </div>
              )}
              <Formik
                initialValues={formdata}
                onSubmit={handlsubmit}
                validationSchema={validationSchema}
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
                    <div class="w-full  bg-white  rounded-lg lg:rounded-l-none">
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Email
                        </label>

                        <AppStyledInput
                          // class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          value={values.email}
                          error={touched.email && errors.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0 w-1/2">
                          <label className="block mb-2 text-sm font-bold text-gray-700">
                            Password
                          </label>
                          <AppStyledInput
                            // class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            name="password"
                            type="password"
                            placeholder="******************"
                            value={values.password}
                            error={touched.password && errors.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div class="md:ml-2 w-1/2">
                          <label className="block mb-2 text-sm font-bold text-gray-700">
                            Confirm Password
                          </label>
                          <AppStyledInput
                            // class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            name="passwordConfirm"
                            type="password"
                            placeholder="******************"
                            value={values.passwordConfirm}
                            error={
                              touched.passwordConfirm && errors.passwordConfirm
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      {isfor === "deliverycompanie" ? (
                        <div className="w-full">
                          <div className="w-full flex">
                            <div className="md:ml-2 w-1/2">
                              <label className="block mb-2 text-sm font-bold text-gray-700">
                                Adress de l'entreprise
                              </label>
                              <AppStyledInput
                                // class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name="businessAdress"
                                type="text"
                                value={values.businessAdress}
                                error={
                                  touched.businessAdress &&
                                  errors.businessAdress
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>

                            <div class="md:ml-2 w-1/2">
                              <label className="block mb-2 text-sm font-bold text-gray-700">
                                Numero de Téléphone :
                              </label>
                              <AppStyledInput
                                // class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name="phone"
                                type="phone"
                                value={values.phone}
                                error={touched.phone && errors.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>

                          <div class="md:ml-2 w-1/2">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                              Ville :
                            </label>
                            <select
                              name="city"
                              className="w-full  border-2 text-gray-900 mt-2 p-3 px-4 active:outline-1"
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            >
                              <option value="costumer">Agadir</option>
                              <option value="Delivery">Bnimelel</option>
                            </select>
                          </div>
                        </div>
                      ) : null}
                      <div className="mb-6 text-center">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="block w-full text-orange-500 text-sm font-semibold rounded-lg hover:bg-orange-200 hover:text-white focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                        >
                          Modifier Vos information
                        </button>
                      </div>
                    </div>
                  );
                }}
              </Formik>
            </div>
          ) : null}
        </div>

        {/* <!-- End of profile tab --> */}
      </div>

      {isfor === "user" && userId && (
        <div
          className="w-full  flex items-center justify-center"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <UserPackagesTable
            ownerid={userId}
            forProfil={true}
            isOwner={false}
          />
        </div>
      )}

      {isfor === "deliverycompanie" && userId && (
        <div
          className="w-full mt-28"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <ServicesDashboard
            forProfil={true}
            isOwner={userId ? false : true}
            userId={userId}
          />
        </div>
      )}

      {isfor === "deliverycompanie" && userId && (
        <div
          className="w-full mt-8 flex flex-col justify-center items-center"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <SectionTitle title={"la liste des colis"} />
          <PackagesTableComponent
            forProfil={true}
            isOwner={false}
            ownerid={userId}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilComponent;
