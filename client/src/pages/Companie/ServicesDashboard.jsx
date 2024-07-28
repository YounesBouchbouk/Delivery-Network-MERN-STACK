import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/companie/Layout";
import DeliveryZonesPart from "../../components/companie/ServicesGridsContents/DeliveryZonesPart";
import ShippingTarrifPart from "../../components/companie/ServicesGridsContents/ShippingTarrifPart";
import WorkingDaysPart from "../../components/companie/ServicesGridsContents/WorkingDaysPart";
import SectionTitle from "../../components/SectionTitle";
import { UserContext } from "../../hooks/Usercontext";
// import useFindUser from "../../hooks/useFindUser";

const ServicesDashboard = ({ forProfil, isOwner, userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deliveryzones, setZones] = useState([]);
  const { user } = useContext(UserContext);

  const fetchZone = async () => {
    const response = await axios.get(
      isOwner
        ? "/delivery/getAuth/deliveryZone"
        : `/delivery/getDelivery/deliveryZone/${userId}`
    );
    const { status, zoneList } = response.data;
    if (status === "successfully") {
      setZones(zoneList);
    } else {
      setError("Some Think Went Wrong");
    }
  };

  useEffect(() => {
    fetchZone();
  }, []);

  const Content = () => {
    return (
      <div
        className={`w-full ${
          !forProfil ? " ml-14 " : ""
        } flex flex-col justify-center items-center`}
      >
        <SectionTitle title={" Services De Laivraison"} />

        <div className="grid grid-cols-1 xl:grid-cols-2 w-full mt-6  ">
          <div className="p-4 col-span-1 row-span-2 border-y-2 border-black-400  flex items-center justify-center  ">
            <DeliveryZonesPart
              deliveryzones={deliveryzones}
              error={error}
              loading={loading}
              setLoading={setLoading}
              setError={setError}
              fetchZone={fetchZone}
              forProfil={forProfil}
            />
          </div>
          <div className="p-4 col-span-1 row-span-1  border-y-2 border-orange-400">
            {user && !forProfil && <WorkingDaysPart user={user} />}
          </div>

          <div className="col-span-1 row-span-1 ">
            <ShippingTarrifPart
              deliveryzones={deliveryzones}
              error={error}
              loading={loading}
              setLoading={setLoading}
              setError={setError}
              fetchZone={fetchZone}
              forProfil={forProfil}
            />
          </div>
          {/* <div className="p-4 col-span-1 row-span-1 xl:row-span-2 bg-orange-700"></div>
          <div className="p-4 col-span-1 row-span-1  bg-gray-100"></div>
          <div className="p-4 col-span-1 row-span-1  bg-gray-300"></div> */}
        </div>
      </div>
    );
  };

  if (!forProfil) {
    return <Layout>{Content()}</Layout>;
  } else {
    return Content();
  }
};

export default ServicesDashboard;
