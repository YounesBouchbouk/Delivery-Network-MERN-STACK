import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = ({ image, href, paragraph, title, label, children }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className=" w-full h-screen relative flex  flex-col-reverse md:flex-row  ">
      <div
        className="w-full  h-full  flex justify-center items-center relative md:w-2/5  lg:w-3/5  "
        style={{
          backgroundImage: `url('${image}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full bg-black opacity-60 absolute top-0 left-0 "></div>
        <div class="py-20 z-20">
          <div className="container mx-auto px-6 ">
            <h2
              className="text-4xl font-bold mb-2 text-white"
              data-aos="fade-right"
              data-aos-duration="2000"
            >
              Bienvenus dans SENDIT Delivery Network
            </h2>
            <h3 className="text-2xl mb-8 text-gray-200">
              {/* Grow your business and sell anywere with out woring about
              distances */}
            </h3>

            <div className="w-full" data-aos="fade-up" data-aos-duration="2000">
              <Link
                to={href || "/login"}
                className="bg-white border-2 border-orange-400 transition-all delay-150 hover:border-white hover:bg-orange-300 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
              >
                {label || "se connecter"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="z-10  md:w-3/5  lg:w-2/5 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
