import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { ResetPasswordReq } from "../fetchapi";
import assets from "../../../data/assets";
import AppStyledInput from "../../../components/AppStyledInput";
import Layout from "../Layout";

export const validationSchema = Yup.object({
  password: Yup.string().min(3, "Invalid password!").required("set a password"),
  passwordConfirm: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

const Newpassword = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { token } = useParams();

  const passwords = {
    password: "",
    passwordConfirm: "",
  };

  const handlsubmit = async (values, formikActions) => {
    console.log(values);
    setLoading(true);
    try {
      const response = await ResetPasswordReq(token, values);

      const { message, status } = response;
      if (status === "fail") {
        setError(message);
      } else {
        setDone("Nous avons bien restoré votre password , Redirect .....");

        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <Layout image={assets.bg2}>
      <div className="w-3/4 bg-white p-4 flex flex-col items-center justify-center">
        <div className="mb-4 w-full flex flex-col items-center justify-center">
          <h2 className="font-bold text-2xl first-letter:uppercase font-mono text-center mb-1">
            S'il vous plaît inséré votre nouveau password
          </h2>
          <div className="h-0.5 w-1/4 bg-orange-300"></div>
        </div>

        {error && (
          <div className="flex justify-center items-center p-4 bg-red-400 rounded-md">
            <p className="text-sm text-white font-robot">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center  p-4  rounded-md">
            <p className="text-sm text-black font-robot">Entrain .....</p>
          </div>
        )}

        {done && (
          <div className="flex justify-center items-center p-4 bg-green-500 rounded-md">
            <p className="text-sm text-white font-robot">{done}</p>
          </div>
        )}

        <Formik
          initialValues={passwords}
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
                <div className="pt-2">
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
                </div>
                <div className="pt-2">
                  {/* <span className="uppercase text-sm text-gray-600 font-bold ">
                Votre Email :
              </span> */}
                  <AppStyledInput
                    error={touched.passwordConfirm && errors.passwordConfirm}
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ispassword={true}
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirmé votre password"
                  />
                </div>

                <div className="mt-4 flex flex-col justify-center items-center ">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="uppercase  text-sm font-bold tracking-wide bg-orange-200 hover:bg-orange-400 shadow-md cursor-pointer text-gray-100 p-3 rounded-full w-3/4 focus:outline-none focus:shadow-outline flex justify-center"
                  >
                    Validé
                  </button>
                  <div className="mt-4">
                    <span className="text-sm font-bold">
                      <Link
                        to={"/login"}
                        className="text-blue-600 ml-2 hover:underline hover:font-bold"
                      >
                        Se Connecter
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

export default Newpassword;
