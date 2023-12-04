import React from 'react';

interface BoxBetaProps {
}

const BoxBeta: React.FC<BoxBetaProps> = () => {
  return (
    <div
      className="position-fixed top-0 start-0"
      style={{ zIndex: 1000 }}
    >
      <div
      	className="w-100 bg-black small text-center rounded-bottom text-white px-2 ms-2"
      >
		    Beta
      </div>
    </div>
  );
};

export default BoxBeta;