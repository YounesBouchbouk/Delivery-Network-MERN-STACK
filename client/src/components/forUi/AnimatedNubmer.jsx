import React from "react";
import AnimatedNumber from "react-animated-number";

const AnimatedNubmer = ({ value }) => {
  return (
    <AnimatedNumber
      value={value}
      // formatValue={(v) => v.toFixd(0)}
      className="text-6xl font-bold font-robot text-black"
      //   className="text-6xl font-bold font-robot text-black"
      formatValue={(n) => n.toFixed(0)}
      frameStyle={(percentage) =>
        percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
      }
      duration={1000}
      // formatValue={(n) => prettyBytes(n)}
    />
  );
};

export default AnimatedNubmer;
