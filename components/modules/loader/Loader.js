import React from "react";

const Loader = ({ loaderWidth }) => {
  return (
    <div
      style={{
        width: loaderWidth || "100%",
      }}
      className="loader"
    >
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Loader;
