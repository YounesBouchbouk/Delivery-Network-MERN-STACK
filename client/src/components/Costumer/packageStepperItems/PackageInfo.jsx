import axios from "axios";
import React, { useEffect, useState } from "react";
import { PackageStepperContext } from "../../../hooks/packageStepperContext";
import NextBackBtn from "./NextBackBtn";
import AOS from "aos";
import "aos/dist/aos.css";

const PackageInfo = ({ step, next, back }) => {
  const [packageInfo, setPackageInfo] = useState({});
  const [workflows, setWorflows] = useState([]);

  const { data, dispatche } = PackageStepperContext();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const response = await axios.get("/shipment/getall/workflow");
      console.log(response);
      setWorflows(response.data.workflows);
    };

    fetchWorkflows();
  }, []);

  const dimentionPackageHandle = (e) => {
    setPackageInfo({
      ...packageInfo,
      dimentions: {
        ...packageInfo.dimentions,
        [e.target.name]: e.target.value,
      },
    });
  };
  const Handlechange = (e) => {
    setPackageInfo({ ...packageInfo, [e.target.name]: e.target.value });
  };
  const receiverHandlechange = (e) => {
    setPackageInfo({
      ...packageInfo,
      receiver: { ...packageInfo.receiver, [e.target.name]: e.target.value },
    });
  };

  const HandlConfirm = () => {
    if (data.packages.products) {
      setPackageInfo({ ...packageInfo, products: data.packages.products });
    }
    dispatche({ type: "ADD_PACKAGEINFO", packageInfo });
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className="w-full  p-4  flex flex-col md:flex-row justify-center grid-rows-2"
        data-aos="fade-left"
      >
        {/* Informations sur les packages */}
        <div className="p-2 w-full md:w-1/2 grid grid-cols-1">
          <div className="flex flex-col justify-start p-2">
            <p className="text-sm font-robot">Informations sur le package :</p>
            <div className="w-full h-0.5 bg-orange-400 "></div>
          </div>

          <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
            <input
              type="text"
              name="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder="Titre "
              required
              onChange={Handlechange}
            />
          </div>

          <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
            <input
              type="text"
              name="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder="Description "
              required
              onChange={Handlechange}
            />
          </div>

          {/* idFrajile and needs Collect */}
          <div className="grid w-full grid-cols-3  col-span-1 xl:gap-6 p-2 ">
            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <select
                name="isFragile"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                onChange={Handlechange}
              >
                <option value="select">isFragile</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>

            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <select
                name="needsCollect"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                onChange={Handlechange}
              >
                <option value="select">needsCollect</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>

            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <select
                name="isCOD"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                onChange={(e) => {
                  dispatche({
                    type: "ADD_WORKFLOW_TO_SHIPPMENT",
                    workflow: e.target.value,
                  });

                  if (e.target.value === "6277d1a6682f263353c09855") {
                    dispatche({
                      type: "ADD_STATUS_TO_SHIPPMENT",
                      status: "6277fa546f190b4392da6186",
                    });
                    dispatche({
                      type: "ADD_STATUS_TO_FRAGMENTSLIST",
                      currentstatus: "6277fa546f190b4392da6186",
                    });
                  } else {
                    dispatche({
                      type: "ADD_STATUS_TO_SHIPPMENT",
                      status: "62901e72a5e07f813b53d2e7",
                    });
                    dispatche({
                      type: "ADD_STATUS_TO_FRAGMENTSLIST",
                      currentstatus: "62901e72a5e07f813b53d2e7",
                    });
                  }

                  // e.target.value === "6277d1a6682f263353c09855"
                  //   ? dispatche({
                  //       type: "ADD_STATUS_TO_SHIPPMENT",
                  //       status: "6277fa546f190b4392da6186",
                  //     })
                  //   : dispatche({
                  //       type: "ADD_STATUS_TO_SHIPPMENT",
                  //       status: "62901e72a5e07f813b53d2e7",
                  //     });
                }}
              >
                <option value="">Workflow</option>
                {workflows.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* dimentions */}
          <div className="grid w-full grid-cols-3  col-span-1 xl:gap-6 p-2 ">
            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <input
                type="number"
                name="width"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="width "
                required
                onChange={dimentionPackageHandle}
              />
            </div>

            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <input
                type="number"
                name="height"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="height "
                required
                onChange={dimentionPackageHandle}
              />
            </div>
            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <input
                type="number"
                name="length"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="length "
                required
                onChange={dimentionPackageHandle}
              />
            </div>
          </div>

          {/* endOf firlst part */}
        </div>
        {/* start of Seconde part */}
        {/* Informations sur le récepteur */}
        <div className="p-2 w-full md:w-1/2 grid grid-cols-1 ">
          <div className="flex flex-col justify-start p-2">
            <p className="text-sm font-robot">Informations sur le récepteur:</p>
            <div className="w-full h-0.5 bg-orange-400 "></div>
          </div>

          {/* receiver Info */}
          <div className="w-full flex flex-col justify-center items-center">
            <div className="grid w-full grid-cols-2  col-span-1 xl:gap-6 p-2 ">
              <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
                <input
                  type="text"
                  name="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder="Nome "
                  required
                  onChange={receiverHandlechange}
                />
              </div>

              <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
                <input
                  type="tel"
                  name="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder="+212 6 -- -- -- -- "
                  required
                  onChange={receiverHandlechange}
                />
              </div>
            </div>

            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <input
                type="text"
                name="address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="Adress :  "
                required
                onChange={receiverHandlechange}
              />
            </div>

            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <input
                type="email"
                name="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="Email :  "
                required
                onChange={receiverHandlechange}
              />
            </div>

            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <input
                type="text"
                name="note"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="Note :  "
                required
                onChange={receiverHandlechange}
              />
            </div>
          </div>
        </div>
        {/* <button
          onClick={() => {
            console.log(data.shipments);
            // console.log(receiverInfo);
          }}
        >
          ClickMe
        </button> */}
      </div>
      <NextBackBtn
        step={step}
        next={next}
        back={back}
        handlClick={HandlConfirm}
        data={data}
      />
    </div>
  );
};

export default PackageInfo;
