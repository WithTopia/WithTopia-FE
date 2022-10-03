import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";
const Loding = () => {
  return (
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <PulseLoader
          color="#815403"
          size={10}
        />
      </div>
    </div>
  );
}

export default Loding;
