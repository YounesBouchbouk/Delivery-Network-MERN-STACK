import React, { useEffect, useRef } from "react";
import { useStepperContext } from "../../../hooks/stepsContext";
import AOS from "aos";
import "aos/dist/aos.css";

const MorePhones = () => {
  const phone = useRef();
  const { data, dispatche } = useStepperContext();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="w-full p-4 " data-aos="fade-left">
      <p className="mx-4 mb-6">
        {" "}
        <span className="font-bold">Vous pouvez ignoré cette étape </span> :
      </p>

      <div className="w-full flex flex-col md:flex-row">
        <div className="grid grid-cols-1 xl:gap-6 w-full md:w-1/2">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{9}"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
              ref={phone}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone number (212-656789029)
            </label>
          </div>

          <div class="relative z-0 w-full mb-6 group">
            <button
              onClick={() => {
                dispatche({
                  type: "ADD_PHONE_NUMBER",
                  phone: phone.current.value,
                });
              }}
              type="button"
              class="text-white w-full bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
            >
              Ajouté
            </button>
          </div>
        </div>

        <div className="w-full p-4 bg-white flex flex-col  justify-start items-center md:w-1/2">
          {data.phones.map((item) => {
            return (
              <div className="px-2 py-2 w-full m m-2 flex-wrap  flex items-center justify-center border-2 border-slate-500 rounded-md ">
                <p className="text-sm font-bold  mr-3">{item}</p>
                <a
                  href="#"
                  class="font-xs text-red-600 dark:text-red-500 hover:underline"
                  onClick={() => {
                    dispatche({
                      type: "REMOVE_PHONE_NUMBER",
                      phone: item,
                    });
                  }}
                >
                  Suprimé
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MorePhones;
