import React from "react";


const LoadingComponent = ({ show }) => {
  return show ? (
    <div className="mooncontainer">
      <div className="moon">
        <svg viewBox="0 -30 288 231.12">
          <polygon
            class="staricon"
            points="141.89,49.99 155.88,93.05 198.52,95.3 164.47,122.89 175.57,166.9 140.54,140.89 104.76,165.84 
	117.16,122.18 83.95,93.59 126.63,92.61 "
          />
        </svg>
      </div>
    </div>
  ) : null;
};

export default LoadingComponent;
