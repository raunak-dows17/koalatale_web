import React from "react";

const SkeletonLoader = ({ width, height, className }) => {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "100%",
      }}
      className={`animate-pulse bg-slate-500 ${className}`}
    ></div>
  );
};

export default SkeletonLoader;
