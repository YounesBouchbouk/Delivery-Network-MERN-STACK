import React from "react";
import TariffTable from "../DataTables/TariffTable";

const ShippingTarrifPart = ({
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
      <p className="text-sm font-robot m-1"> Shipping Tarrif</p>
      <div className="bg-orange-300 h-0.5"></div>
      <div className="w-full">
        <TariffTable
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

export default ShippingTarrifPart;
