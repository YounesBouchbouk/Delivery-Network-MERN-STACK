import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="p-4  text-4xl uppercase font-Bebas  ">
      <h1>{title}</h1>

      <div className="h-0.5 bg-orange-300 "></div>
    </div>
  );
};

export default SectionTitle;
