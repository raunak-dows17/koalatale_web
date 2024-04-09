import React from "react";

const LinearLoader = ({ width }) => {
  return (
    <progress
      style={{
        width: width || "100%",
        color: "#3B719F",
      }}
      className="progress-linear bg-primaryColor/50"
    />
  );
};

export default LinearLoader;
