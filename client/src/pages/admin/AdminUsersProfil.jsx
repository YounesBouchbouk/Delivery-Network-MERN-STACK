import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import ProfilComponent from "../../components/ProfilComponent";
import { getOne } from "./fetchapi";

const AdminUsersProfil = () => {
  const { userId } = useParams();
  const [data, setData] = useState({ email: "", name: "" });
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await getOne(userId);
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
          isfor={data.role}
          data={data}
          isloading={isloading}
          isOwner={false}
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsersProfil;
