import React from "react";

const ButtonLoading = ({ width }) => {
  return (
    <div>
      <button className={`btn ${width} btn-square btn-primary`}>
        <span className="loading loading-spinner"></span>
      </button>
    </div>
  );
};

export default ButtonLoading;
