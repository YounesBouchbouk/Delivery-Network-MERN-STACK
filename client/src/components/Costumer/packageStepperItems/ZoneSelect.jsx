import axios from "axios";
import React, { useState, useEffect } from "react";
import { PackageStepperContext } from "../../../hooks/packageStepperContext";
import FindZonesForm from "../findZonesForm";
import FoundedZonesTables from "../FoundedZonesTables";
import NextBackBtn from "./NextBackBtn";

const ZoneSelect = ({ step, next, back }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fragmentsList, setFragments] = useState([]);
  const { data, dispatche } = PackageStepperContext();

  const findPath = async (from, to) => {
    dispatche({
      type: "ADD_SHIPPMENT",
      Globalshipments: {
        fromCity: from,
        toCity: to,
        // status: "6277fa546f190b4392da6186",
        workflow: "6277d1a6682f263353c09855",
      },
    });

    data.shipment_fragments = [];

    setLoading(true);
    const response = await axios.post("/packages/gestion/findpackageRoute", {
      from,
      to,
    });
    const { status, path } = response.data;

    console.log("hnaaa");
    console.log(response.data);
    // console.log(path[0]);

    if (status === "successfully") {
      if (path[0].length !== 1) setFragments(path[0]);
      else setFragments(path[0]);
    } else {
      setError("Sorry we didn't find any path ");
      setFragments([]);
    }
    setLoading(false);

    setTimeout(() => {
      setError(false);
      // setLoading(false);
    }, 3000);
    // console.log(fragmentsList);
  };

  return (
    <div className="w-full my-4">
      <FindZonesForm findPath={findPath} dispatche={dispatche} />
      <FoundedZonesTables
        error={error}
        loading={loading}
        fragmentsList={fragmentsList}
      />
      <NextBackBtn
        step={step}
        next={next}
        back={back}
        handlClick={null}
        data={fragmentsList}
      />
    </div>
  );
};

export default ZoneSelect;
