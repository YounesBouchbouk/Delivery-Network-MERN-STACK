import React, { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import Layout from "../components/companie/Layout";
import UserLayout from "../components/Costumer/UserLayout";
import Loading from "../components/Loading";
import ProfilComponent from "../components/ProfilComponent";
import { getMe } from "./admin/fetchapi";
import { updateMe } from "./fetchapi";

const Profil = () => {
  const [data, setData] = useState({});
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const [city, setCity] = useState("");
  const formdata = {
    email: "",
    password: "",
    passwordConfirm: "",
    businessAdress: "",
    phone: "",
  };

  const handlsubmit = async (values, formikActions) => {
    // let o = Object.keys(values).filter((k) => values[k] !== "");
    let emailHasChanged = false;
    setLoading(true);
    let authdata = {
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };

    authdata = Object.fromEntries(
      Object.entries(authdata).filter(([_, v]) => v !== "")
    );

    let businessinfo = {
      Adress: values.businessAdress,
      city,
      phone: values.phone,
    };

    businessinfo = Object.fromEntries(
      Object.entries(businessinfo).filter(([_, v]) => v !== "")
    );

    let finalObject = { ...authdata };
    if (
      businessinfo.hasOwnProperty("city") ||
      businessinfo.hasOwnProperty("Adress") ||
      businessinfo.hasOwnProperty("phone")
    ) {
      finalObject = { ...finalObject, businessinfo };
    } else {
    }

    const response = await updateMe(finalObject);
    const { message, status } = response;
    if (status !== "fail") {
      if (data.email !== values.email && values.email !== "") {
        emailHasChanged = true;
      }

      setData(response.user);
      setDone("Nous avons bien changé vos information ");
      setTimeout(() => {
        setDone(false);
      }, 7000);
    } else {
      setError("Nous Avons rencontrue un problém ");
      setTimeout(() => {
        setError(false);
      }, 7000);
    }
    setLoading(false);

    if (emailHasChanged) {
      localStorage.removeItem("jwt");
      window.location.href = "/login";
    }
  };

  const fetchData = async () => {
    const response = await getMe();
    // console.log(response.user);
    const { status, user, message } = response;
    if (status === "successfuly") {
      setData(user);
    } else {
      setError(message);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchData();
    setLoading(false);
  }, []);

  if (isloading) {
    <Layout>
      <Loading />
    </Layout>;
  }

  if (data.role === "admin" && !isloading) {
    return (
      <AdminLayout>
        <ProfilComponent
          isfor={data.role}
          data={data}
          isloading={isloading}
          isOwner={true}
          handlsubmit={handlsubmit}
          setCity={setCity}
          formdata={formdata}
          done={done}
          error={error}
          fetchData={fetchData}
        />
      </AdminLayout>
    );
  } else if (data.role === "user" && !isloading) {
    return (
      <UserLayout>
        <ProfilComponent
          isfor={data.role}
          data={data}
          isloading={isloading}
          isOwner={true}
          handlsubmit={handlsubmit}
          setCity={setCity}
          formdata={formdata}
          done={done}
          error={error}
          fetchData={fetchData}
        />
      </UserLayout>
    );
  } else if (data.role === "deliverycompanie" && !isloading) {
    return (
      <Layout>
        <ProfilComponent
          isfor={data.role}
          data={data}
          isloading={isloading}
          isOwner={true}
          handlsubmit={handlsubmit}
          setCity={setCity}
          formdata={formdata}
          done={done}
          error={error}
          fetchData={fetchData}
        />
      </Layout>
    );
  }
};

export default Profil;
