import React from "react";

const SkeletonLoader = ({ width, height }) => {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "100%",
      }}
      className="animate-pulse bg-slate-500"
    ></div>
  );
};

export default SkeletonLoader;
