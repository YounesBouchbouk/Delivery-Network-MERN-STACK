import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import ProfilComponent from "../../components/ProfilComponent";
import { getMe } from "./fetchapi";
const AdminProfil = () => {
  const [data, setData] = useState({});
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
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

    fetchData();
    setLoading(false);
  }, []);

  return (
    <AdminLayout>
      {error ? (
        <div>{error}</div>
      ) : (
        <ProfilComponent
          isfor={"admin"}
          data={data}
          isloading={isloading}
          isOwner={true}
        />
      )}
    </AdminLayout>
  );
};

export default AdminProfil;
