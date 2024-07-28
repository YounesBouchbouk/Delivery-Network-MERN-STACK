import React from "react";
import ZonesTable from "../DataTables/ZonesTable";

const DeliveryZonesPart = ({
  deliveryzones,
  error,
  loading,
  setLoading,
  setError,
  fetchZone,
  forProfil,
}) => {
  return (
    <div className="w-full ">
      <p className="text-sm font-robot m-1"> Zones De laivraison</p>
      <div className="bg-orange-300 h-0.5"></div>
      <div className="w-full">
        <ZonesTable
          deliveryzones={deliveryzones}
          error={error}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          fetchZone={fetchZone}
          forProfil={forProfil}
        />
      </div>
    </div>
  );
};

export default DeliveryZonesPart;
