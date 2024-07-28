import React, { useState, useEffect } from "react";
import { PackageStepperContext } from "../../../hooks/packageStepperContext";
import NextBackBtn from "./NextBackBtn";
import AOS from "aos";
import "aos/dist/aos.css";

const Productsinfo = ({ step, next, back }) => {
  const { data, dispatche } = PackageStepperContext();
  // const [products, setProducts] = useState([]);
  const [newOne, setNewOne] = useState({});

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const Handlechange = (e) => {
    setNewOne({ ...newOne, [e.target.name]: e.target.value });
  };
  const addToListe = () => {
    let count = 0;
    if (data.packages.orderLines?.products) {
      count = data.packages.orderLines.products.length;
      while (
        data.packages.orderLines.products?.filter(
          (item) => item.index === count
        ).length !== 0
      ) {
        count++;
      }
    }

    dispatche({ type: "ADD_NEW_PRODUCT", newOne: { ...newOne, index: count } });

    // setProducts([...products, { ...newOne, index: count }]);
  };
  const deleteOne = (position) => {
    // setProducts(products.filter((item) => item.index !== position));

    dispatche({ type: "DELETE_PRODUCT", index: position });
  };

  const HandleConfirm = () => {
    let countProducts = data.packages.orderLines.products.length;
    const initialValue = 0;
    const totalofProductsPice = data.packages.orderLines.products.reduce(
      (previousValue, currentValue) =>
        previousValue + parseInt(currentValue.price),
      initialValue
    );
    dispatche({
      type: "ADD_ORDERLINES_PRICEANDLENGHT",
      totalPrice: totalofProductsPice,
      qty: countProducts,
    });
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center"
      data-aos="fade-left"
    >
      <div className="w-full  p-4  flex flex-col md:flex-row justify-center grid-rows-2">
        <div className="p-2 w-full md:w-1/2 grid grid-cols-1">
          <div className="flex flex-col justify-start p-2">
            <p className="text-sm font-robot">Informations sur le produit :</p>
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
              name="Description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder="Description "
              required
              onChange={Handlechange}
            />
          </div>

          {/* idFrajile and needs Collect */}
          <div className="grid w-full grid-cols-2  col-span-1 xl:gap-6 p-2 ">
            <div className="grid w-full col-span-1 xl:gap-6 p-2 ">
              <input
                type="number"
                name="price"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="Prix "
                required
                onChange={Handlechange}
              />
            </div>

            <div class="relative z-0 w-full mb-4 lg:mb-2  group">
              <button
                onClick={() => {
                  addToListe();
                  // dispatche({ type: "AFFICHE_DATA" });
                }}
                type="button"
                class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
              >
                Ajouté
              </button>
            </div>
          </div>

          {/* endOf firlst part */}
        </div>

        {/* start of Seconde part */}
        <div className="p-2 w-full md:w-1/2 grid grid-cols-1 ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Titre
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>

                <th scope="col" class="px-6 py-3">
                  Prix
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.packages.orderLines?.products.map((item, index) => {
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

                    <td class="px-6 py-4 text-right">
                      <a
                        href="#"
                        class="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => {
                          deleteOne(item.index);
                        }}
                      >
                        Suprimé
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* <button
        onClick={() => {
          HandleConfirm();
          // console.log(receiverInfo);
        }}
      >
        ClickMe
      </button> */}
      <NextBackBtn
        step={step}
        next={next}
        back={back}
        handlClick={HandleConfirm}
        data={data}
      />
    </div>
  );
};

export default Productsinfo;
