import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import assets from "../../../data/assets";
import Layout from "../Layout";
import { validationprocessapi } from "../fetchapi";

const ConfirmProcess = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { Emailtoken } = useParams();

  useEffect(() => {
    setLoading(true);
    const validationprocess = async () => {
      try {
        const response = await validationprocessapi(Emailtoken);
        const { message, status } = response;
        if (status === "fail") {
          setError(message);
          setLoading(false);
        } else {
          setDone(
            "Nous avons bien confimé votre email adress  , Redirect ....."
          );

          setLoading(false);

          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    setTimeout(() => {
      validationprocess();
    }, 3000);
  }, []);
  return (
    <Layout image={assets.bg1}>
      <div className="w-3/4 bg-white p-4 flex flex-col items-center justify-center">
        <div className="mb-4 w-full flex flex-col items-center justify-center">
          <h2 className="font-bold text-2xl first-letter:uppercase font-mono text-center mb-1">
            Email Confirmation Process
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
      </div>
    </Layout>
  );
};

export default ConfirmProcess;
