import axios from "axios";
import React, { useEffect, useState } from "react";
import { PackageStepperContext } from "../../../hooks/packageStepperContext";
import ShippingTypeui from "../../forUi/shippingTypeui";
// import FoundedZonesTables from "../FoundedZonesTables";
import NextBackBtn from "./NextBackBtn";
import AOS from "aos";
import "aos/dist/aos.css";

const Review = ({ step, next, back }) => {
  const { data, dispatche } = PackageStepperContext();
  const [fragmentsList, setFragmentsList] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const fetchShippingFrag = async () => {
      let array = [];
      data.shipment_fragments.map((item) => array.push(item.ChosedTarrif));

      const responses = await axios.post(
        "/shipping/List/shippingTariff",
        array
      );
      setFragmentsList(responses.data.List);
    };
    setLoading(true);
    fetchShippingFrag();
    setLoading(false);
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const calculateTotlaPrice = () => {
    let total = 0;
    fragmentsList?.map((item) => {
      total =
        total +
        item.delivery_zone.fees +
        item.fees +
        item.cost_par_unit_ofvolume +
        item.price_par_kg * 1 +
        item.price_par_km * 90;
    });

    return total;
  };

  const preparObjectAndsend = async () => {
    // setLoading(true);
    let price = calculateTotlaPrice();
    dispatche({
      type: "ADD_TOTAL_AMOUNT_TO_PACKAGE",
      total: price,
    });
    const { packages, ...Object } = data;
    const { orderLines, ...others } = packages;
    const packagedetails = {
      totalPrice: price,
      currency: "6275aeecc91c288468995882",
      orderLines,
    };
    const newObject = {
      ...Object,
      packages: [{ ...others, packagedetails: packagedetails, amout: price }],
    };

    console.log(newObject);

    const response = await axios.post(
      "/packages/gestion/addMany/Package",
      newObject
    );

    const { status, message } = response.data;

    if (status === "successfully") {
      setDone(
        "Nous Avons Bien Ajouté votre Courier , notre service Client va vous applé plus tart pour Confirmé "
      );
    } else {
      setError(message);
    }
    console.log(newObject);
    setTimeout(() => {
      setDone(false);
      setError(false);
    }, 5000);
    setLoading(false);
  };
  // console.log(data);
  return (
    <div className="w-full " data-aos="fade-left">
      {/* Table */}

      {error && (
        <div className="p-4 w-full bg-red-500 ">
          <p className="font-robot text-sm text-white">{error}</p>
        </div>
      )}

      {Loading && (
        <div className="p-4 w-full bg-orange-500 ">
          <p className="font-robot text-sm text-white">cherching ........</p>
        </div>
      )}

      {done && (
        <div className="p-4 w-full bg-green-500 ">
          <p className="font-robot text-sm text-white">{done}</p>
        </div>
      )}

      {/* Table Tarrif */}

      <div className="w-full p-4 bg-slate-50">
        {!Loading && (
          <div className="w-full">
            {fragmentsList?.map((item, index) => {
              return (
                <div className="w-full mb-6" key={index}>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-4">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Chemin
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Service
                        </th>
                        <th scope="col" className="px-6 py-3">
                          type
                        </th>
                        <th scope="col" className="px-6 py-3">
                          jours estimé
                        </th>
                        <th scope="col" className="px-6 py-3">
                          unité
                        </th>
                        <th scope="col" className="px-6 py-3">
                          par Kg
                        </th>
                        <th scope="col" className="px-6 py-3">
                          tarif frais
                        </th>
                        <th scope="col" className="px-6 py-3">
                          frais de la zone
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 ">
                          <p className="font-robot font-bold text-sm">
                            {`${item.delivery_zone.from.name}` +
                              " " +
                              "to" +
                              " " +
                              `${item.delivery_zone.to.name}`}
                          </p>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap flex items-center "
                        >
                          <img
                            src={item.delivery_zone.delivery_service.Avatar}
                            alt="Tailwind"
                            className="w-12 h-12 mr-2"
                          />
                          <p>{item.delivery_zone.delivery_service.name}</p>
                        </td>

                        <td className="px-6 py-4">
                          <ShippingTypeui
                            name={item.shipping_type.typeOfshipping}
                          />
                        </td>

                        <td className="px-6 py-4">
                          {item.delivery_zone.estimated_days}
                        </td>

                        <td className="px-6 py-4">
                          {item.cost_par_unit_ofvolume}
                        </td>
                        <td className="px-6 py-4">{item.price_par_kg}</td>
                        <td className="px-6 py-4">{item.fees}</td>
                        <td className="px-6 py-4">{item.delivery_zone.fees}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-black h-0.5  w-full"></div>
      {/* End of Table Tarrif */}

      <div className="grid grid-cols-4">
        <div className="col-span-2"></div>
        <div className="col-span-1 items-end justify-items-end text-right p-2">
          Total :{" "}
        </div>
        <div className="col-span-1 items-end justify-items-end bg-slate-100  text-right font-bold p-2">
          {calculateTotlaPrice()} MAD
        </div>
      </div>

      {/* Info */}
      <div className="w-full grid grid-cols-2  md:grid-cols-2 p-4">
        <div className="grid col-span-1  grid-cols-1">
          <div className="flex flex-col justify-start p-2">
            <p className="text-sm font-robot">Informations sur le package :</p>
            <div className="w-full h-0.5 bg-orange-400 "></div>
          </div>

          <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold  text-sm font-Play"> Title :</p>
            </div>
            <div className="col-span-2 justify-items-center items-center">
              <p className="text-sm">{data.packages.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold text-sm font-Play"> Description :</p>
            </div>
            <div className="col-span-2 justify-items-center items-center">
              <p className="text-sm">{data.packages.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-5 col-span-1  justify-items-center items-center my-1">
            {/* box4 item 1 */}
            <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold font-Play uppercase text-sm">Fragile</p>
              </div>
              <div className="col-span-1 justify-items-center items-center">
                <p>{data.packages.isFragile}</p>
              </div>
            </div>

            {/* box4 item 2 */}
            <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold font-Play uppercase text-sm">
                  Collecteur
                </p>
              </div>
              <div className="col-span-1 justify-items-center items-center">
                <p>{data.packages.needsCollect}</p>
              </div>
            </div>

            {/* box4 item 1 */}
            <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold font-Play uppercase text-sm">width</p>
              </div>
              <div className="col-span-1 justify-items-center items-center">
                <p>
                  <p>{data.packages.dimentions.width}</p>
                  in
                </p>
              </div>
            </div>

            {/* box4 item 2 */}
            <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold font-Play uppercase text-sm">height</p>
              </div>
              <div className="col-span-1 justify-items-center items-center">
                <p>{data.packages.dimentions.height} in</p>
              </div>
            </div>

            {/* box4 item 3 */}
            <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold font-Play uppercase text-sm">Lenght</p>
              </div>
              <div className="col-span-1 justify-items-center items-center">
                <p>{data.packages.dimentions.lenght} in</p>
              </div>
            </div>
          </div>

          {/* for dimentions */}

          <div className="flex flex-col justify-start p-2">
            <p className="text-sm font-robot">
              Informations sur le récepteur :
            </p>
            <div className="w-full h-0.5 bg-orange-400 "></div>
          </div>

          <div className="grid grid-cols-3 col-span-1  justify-items-center items-center my-1 ">
            {/* item */}
            <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1 ">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold text-sm font-Play"> Nome :</p>
              </div>
              <div className="col-span-2 justify-items-center items-center">
                <p className="text-sm"> {data.packages.receiver.name}</p>
              </div>
            </div>

            {/* item */}
            <div className="grid grid-cols-3 col-span-2 justify-items-center items-center my-1">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold text-sm font-Play"> Email :</p>
              </div>
              <div className="col-span-2 justify-items-center items-center">
                <p className="text-sm"> {data.packages.receiver.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 col-span-1  justify-items-center items-center my-1">
            {/* item */}

            <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold  text-sm font-Play"> Adress :</p>
              </div>
              <div className="col-span-2 justify-items-center items-center">
                <p className="text-sm"> {data.packages.receiver.address}</p>
              </div>
            </div>

            {/* item */}
            <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
              <div className="col-span-1 justify-items-center items-center">
                <p className="font-bold text-sm font-Play"> Note :</p>
              </div>
              <div className="col-span-2 justify-items-center items-center">
                <p className="text-sm"> {data.packages.receiver.note}</p>
              </div>
            </div>

            {/* item */}
          </div>
        </div>

        {/* product products */}
        <div className="grid col-span-1 grid-cols-1">
          <div className="flex flex-col justify-start p-2">
            <p className="text-sm font-robot">Informations sur les produits:</p>
            <div className="w-full h-0.5 bg-orange-400 "></div>
          </div>
          <div className="w-full ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.packages.orderLines.products?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {item.title}
                      </th>
                      <td class="px-6 py-4">{item.Description}</td>
                      <td class="px-6 py-4">{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* text button */}
      {/* <button
        onClick={() => {
          // console.log(fragmentsList);
          preparObjectAndsend();
        }}
      >
        LaLA
      </button> */}

      <NextBackBtn
        step={step}
        next={next}
        back={back}
        handlClick={null}
        data={data}
        preparObjectAndsend={preparObjectAndsend}
      />
    </div>
  );
};

export default Review;
