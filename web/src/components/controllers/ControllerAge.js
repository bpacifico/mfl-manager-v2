import React from 'react';

interface ControllerAgeProps {
  ageAtMintMin?: int;
  ageAtMintMax?: int;
  onChange: func;
}

const ControllerAge: React.FC<ControllerAgeProps> = ({ ageAtMintMin, ageAtMintMax, onChange }) => {
  const minAge = 16;
  const maxAge = 40;
  
  const getAgeTextValue = () => {
    if (ageAtMintMin || ageAtMintMax) {
      let text = [];

      text.push(<span>{ageAtMintMin || <>- <i className="bi bi-infinity"></i></>}</span>);
      text.push(<i className="bi bi-arrow-right small mx-2"></i>);
      text.push(<span>{ageAtMintMax || <i className="bi bi-infinity"></i>}</span>);

      return text;
    }

    return "All";
  }

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <h4>Age</h4>
      </div>
      <div className="col-12 text-center text-white">
        <h3>{getAgeTextValue()}</h3>
      </div>
      <div className="col">
    	  <input
          className="w-100"
          type="range"
          value={ageAtMintMin || minAge}
          min={minAge.toString()}
          max={ageAtMintMax ? Math.min(maxAge, ageAtMintMax) : maxAge}
          step="1"
          onChange={(v) => onChange(v.target.value, ageAtMintMax)}
        >
        </input>

        <input
          className="w-100 text-primary bg-dark"
          type="range"
          value={ageAtMintMax || maxAge}
          min={ageAtMintMin ? Math.max(minAge, ageAtMintMin) : minAge}
          max={maxAge.toString()}
          step="1"
          onChange={(v) => onChange(ageAtMintMin, v.target.value)}
        >
        </input>
      </div>
    </div>
  );
};

export default ControllerAge;