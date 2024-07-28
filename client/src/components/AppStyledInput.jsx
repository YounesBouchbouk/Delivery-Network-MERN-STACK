import React from "react";

const AppStyledInput = ({ error, ispassword, ...props }) => {
  return (
    <div className="w-full">
      {error && <p className="font-bold text-xs text-red-600">*{error}</p>}
      <input
        {...props}
        className="w-full  border-2  mt-2 p-3  px-4 active:outline-1  rounded-full"
      />
    </div>
  );
};

export default AppStyledInput;
