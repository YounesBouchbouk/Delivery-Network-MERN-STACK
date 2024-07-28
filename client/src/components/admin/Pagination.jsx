import React, { useEffect, useState } from "react";

const Pagination = ({ nbtotal, page, dispatch, limit }) => {
  //   const [limit, setlimit] = useState([1]);
  //const [variable, setVar] = useState(2);
  let pages = [1];
  //   useEffect(() => {}, []);

  let total = nbtotal;
  let i = 2;
  while (total - limit > 0) {
    pages = [...pages, i];

    i = i + 1;
    total = total - limit;
  }

  return (
    <div className="flex w-full  items-center p-2">
      <p className="text-xl font-Play ">Page : </p>
      {pages?.map((item) => {
        return (
          <button
            onClick={() => {
              //setPage(item);
              dispatch({ type: "SETPAGE", page: item });
            }}
            className={`border-2 w-7 h-7 m-1  flex flex-col justify-center items-center font-robot ${
              page === item ? "bg-orange-300" : ""
            } border-orange-300 hover:bg-orange-600 hover:text-white`}
            key={item}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
