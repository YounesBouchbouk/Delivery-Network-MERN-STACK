import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import AppStyledInput from "../../../components/AppStyledInput";
import { loginReq } from "../fetchapi";
import assets from "../../../data/assets";
import Layout from "../Layout";
import { UserContext } from "../../../hooks/Usercontext";
import AOS from "aos";
import "aos/dist/aos.css";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Votre Email est invalid!")
    .required("saisie votre email"),
  businessname: Yup.string().min(3, "Invalid name!"),
  businessAdress: Yup.string().min(5, "invalid Adress"),
  password: Yup.string()
    .min(3, "Votre password est invalid!")
    .required("saisie votre mote de pass"),
});

const Login = () => {
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const userInfo = {
    email: "",
    password: "",
  };

  const handlsubmit = async (values, formikActions) => {
    console.log(values);
    try {
      const response = await loginReq(values);
      const { status, message, token, data } = response;

      if (status === "success") {
        setUser(data.user);

        if (data.user.role === "admin") {
          window.location.href = "/admin/Dashboard";
        } else if (data.user.role === "user") {
          window.location.href = "/user/Dashboard";
        } else {
          if (data.user.profileComplited === false) {
            window.location.href = "/delivery/completeprofile";
          } else {
            window.location.href = "/delivery/Dashboard/packages";
          }
        }
      } else {
        setError("votre email / mote de pass est incorrect ... ");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      console.log("ann error ", error);
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Layout image={assets.bg1} href={"/signUp"} label="s'inscrire maintenant ">
      <div className="w-3/4 bg-white p-4 flex flex-col items-center justify-center">
        <div
          data-aos="fade-right"
          data-aos-duration="1500"
          className="mb-4 w-full flex flex-col items-center justify-center"
        >
          <h2 className="font-bold text-2xl first-letter:uppercase font-mono text-center mb-1">
            Connectez-vous avec votre Compte
          </h2>
          <div className="h-0.5 w-1/4 bg-orange-300"></div>
        </div>

        {error && (
          <div className="flex justify-center items-center">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

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
                  data-aos="fade-left"
                  data-aos-duration="1500"
                  className="pt-2"
                >
                  <AppStyledInput
                    error={touched.email && errors.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div
                  className="pt-2"
                  data-aos="fade-right"
                  data-aos-duration="1500"
                >
                  {/* <span className="uppercase text-sm text-gray-600 font-bold ">
                Votre Email :
              </span> */}
                  <AppStyledInput
                    error={touched.password && errors.password}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ispassword={true}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <div
                    className="w-full  text-right"
                    data-aos="fade-left"
                    data-aos-duration="1500"
                  >
                    <span className="text-sm font-bold text-blue-600 hover:underline ">
                      <Link to={"/Forgetpassword"} className="text-right">
                        mot de pass oublier ?
                      </Link>
                    </span>
                  </div>
                </div>

                <div
                  className="mt-4 flex flex-col justify-center items-center"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                >
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="uppercase  text-sm font-bold tracking-wide bg-orange-200 hover:bg-orange-400 shadow-md cursor-pointer text-gray-100 p-3 rounded-full w-3/4  focus:shadow-outline flex justify-center focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs"
                  >
                    Se connecter
                    {/* <FaHandHoldingHeart className="text-lg " /> */}
                  </button>
                  <div
                    className="mt-4"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    <span className="text-sm font-bold">
                      Pas encore de compte ?
                      <Link
                        to={"/SignUp"}
                        className="text-blue-600 ml-2 hover:underline hover:font-bold"
                      >
                        S'indentifier
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default Login;
