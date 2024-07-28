import React, { useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { ForgetPswapi } from "../fetchapi";
import * as Yup from "yup";
import AppStyledInput from "../../../components/AppStyledInput";
import assets from "../../../data/assets";
import Layout from "../Layout";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
});

const Forgetpassword = () => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);
  const userEmail = {
    email: "",
  };

  const handllogin = async (values, formikActions) => {
    try {
      const response = await ForgetPswapi(values.email);
      const { status, message } = response;

      if (status === "success") {
        console.log("please check you email and click the link ");
        setDone(
          `Nous avons envoyé un email avec un lien d restauration de votre password   à ${values.email}`
        );

        setTimeout(() => {
          setDone(null);
        }, 7000);
      } else {
        setError(message);
        setTimeout(() => {
          setError(null);
        }, 7000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout image={assets.bg2}>
      <div className="w-3/4 bg-white p-4 flex flex-col items-center justify-center">
        <div className="mb-4 w-full flex flex-col items-center justify-center">
          <h2 className="font-bold text-2xl first-letter:uppercase font-mono text-center mb-1">
            Insère votre Email
          </h2>
          <div className="h-0.5 w-1/4 bg-orange-300"></div>
        </div>

        {error && (
          <div className="flex justify-center items-center">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {done ? (
          <div className="w-full bg-orange-200 p-3 rounded-sm  ">{done}</div>
        ) : (
          <Formik
            initialValues={userEmail}
            validationSchema={validationSchema}
            onSubmit={handllogin}
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
                      error={touched.email && errors.email}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="mt-4 flex flex-col justify-center items-center ">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="uppercase  text-sm font-bold tracking-wide bg-orange-200 hover:bg-orange-400 shadow-md cursor-pointer text-gray-100 p-3 rounded-full w-3/4 focus:outline-none focus:shadow-outline flex justify-center"
                    >
                      Demander
                    </button>
                    <div className="mt-4">
                      <span className="text-sm font-bold">
                        <Link
                          to={"/login"}
                          className="text-blue-600 ml-2 hover:underline hover:font-bold"
                        >
                          Retour
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          </Formik>
        )}
      </div>
    </Layout>
  );
};

export default Forgetpassword;
