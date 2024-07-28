import React, { useEffect, useState } from "react";
import UserLayout from "../components/Costumer/UserLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductsAndDetails from "../components/PackageInfoComponents/ProductsAndDetails";
import ShipmentsTable from "../components/PackageInfoComponents/ShipmentsTable";
import Layout from "../components/companie/Layout";
import AdminLayout from "../components/admin/AdminLayout";

const PackageDetails = ({ thisfor }) => {
  const { packageId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchAuthpackages = async () => {
      let response = await axios.get(
        `/packages/gestion/getOne/Package/${packageId}`
      );

      const { status, message } = response.data;
      console.log(response.data);
      if (status === "successfully") {
        setData(response.data.package);
      } else {
        setError(message);
      }
    };
    setLoading(true);

    fetchAuthpackages();

    setLoading(false);
  }, [packageId]);

  const { packageGroup, packagedetails, receiver, dimentions } = data;

  console.log(packageGroup);
  console.log(packagedetails);
  console.log(receiver);
  console.log(dimentions);

  const ShipmentTable = () => {
    return (
      <ShipmentsTable
        shipment_fragments={packageGroup?.shipment[0].shipment_fragments}
        loading={loading}
        amout={data.amout}
        currentstatus={data.packageGroup?.shipment[0].status.status.name}
        foradmin={false}
        forCompanie={false}
        forUser={true}
      />
    );
  };

  const PackageDetails = () => {
    return <ProductsAndDetails data={data} />;
  };

  if (thisfor === "user") {
    return (
      <UserLayout>
        <div className="ml-14  flex flex-col justify-center items-center bg-slate-50">
          {error && (
            <div className="p-4 w-full bg-red-500 ">
              <p className="font-robot text-sm text-white">{error}</p>
            </div>
          )}

          <div className="w-full bg-slate-50 p-4">
            {/* Table of Price */}
            {thisfor === "admin" || thisfor === "user" ? ShipmentTable() : null}
            {/* moreinfo */}

            {PackageDetails()}
          </div>
        </div>
      </UserLayout>
    );
  } else if (thisfor === "deliverycompanie") {
    return (
      <Layout>
        <div className="w-full ml-14 h-screen flex flex-col justify-center items-center bg-slate-50">
          {error && (
            <div className="p-4 w-full bg-red-500 ">
              <p className="font-robot text-sm text-white">{error}</p>
            </div>
          )}

          <div className="w-full  p-4">
            {/* Table of Price */}
            {thisfor === "admin" || thisfor === "user" ? ShipmentTable() : null}
            {/* moreinfo */}

            {PackageDetails()}
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <AdminLayout>
        {error && (
          <div className="p-4 w-full bg-red-500 ">
            <p className="font-robot text-sm text-white">{error}</p>
          </div>
        )}

        <div className="w-full bg-slate-50 p-4">
          {/* Table of Price */}
          {thisfor === "admin" || thisfor === "user" ? ShipmentTable() : null}
          {/* moreinfo */}

          {PackageDetails()}
        </div>
      </AdminLayout>
    );
  }
};

export default PackageDetails;
