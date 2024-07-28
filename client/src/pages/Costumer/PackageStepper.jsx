import React, { useState } from "react";
import PackageStepperBar from "../../components/Costumer/packageStepperBar";
import NextBackBtn from "../../components/Costumer/packageStepperItems/NextBackBtn";
import PackageInfo from "../../components/Costumer/packageStepperItems/PackageInfo";
import Productsinfo from "../../components/Costumer/packageStepperItems/Productsinfo";
import Review from "../../components/Costumer/packageStepperItems/Review";
import ZoneSelect from "../../components/Costumer/packageStepperItems/ZoneSelect";

import UserLayout from "../../components/Costumer/UserLayout";
import { UsePackageContextProvider } from "../../hooks/packageStepperContext";

const PackageStepper = () => {
  const [step, setStep] = useState(1);

  const next = () => {
    setStep(step + 1);
    console.log(step);
  };

  const back = () => {
    setStep(step - 1);
    console.log(step);
  };

  const ToRender = () => {
    switch (step) {
      case 1:
        return <ZoneSelect step={step} next={next} back={back} />;
        break;
      case 2:
        return <PackageInfo step={step} next={next} back={back} />;
        break;
      case 3:
        return <Productsinfo step={step} next={next} back={back} />;
        break;
      case 4:
        return <Review step={step} next={next} back={back} />;
        break;
      default:
        return <ZoneSelect step={step} next={next} back={back} />;
        break;
    }
  };
  return (
    <UsePackageContextProvider>
      <UserLayout>
        <div className="w-full   flex flex-col items-center justify-center ml-10 p-4">
          <div className="bg-white w-11/12 p-4 shadow-sm   flex flex-col justify-center items-center">
            {/* <div className="bg-orange-400 h-1.5 rounded-md w-full mb-3"></div> */}
            <PackageStepperBar step={step} />
          </div>
          <div className=" w-11/12">{ToRender()}</div>
          {/* <NextBackBtn step={step} next={next} back={back} /> */}
        </div>
      </UserLayout>
    </UsePackageContextProvider>
  );
};

export default PackageStepper;
