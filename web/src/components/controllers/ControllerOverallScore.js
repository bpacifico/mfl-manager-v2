import React from 'react';

interface ControllerOverallScoreProps {
  overallMin?: int;
  overallMax?: int;
  onChange: func;
}

const ControllerOverallScore: React.FC<ControllerOverallScoreProps> = ({ overallMin, overallMax, onChange }) => {
  
  const getOverallScoreTextValue = () => {
    if (overallMin || overallMax) {
      let text = [];

      text.push(<span>{overallMin || <>- <i className="bi bi-infinity"></i></>}</span>);
      text.push(<i className="bi bi-arrow-right small mx-2"></i>);
      text.push(<span>{overallMax || <i className="bi bi-infinity"></i>}</span>);

      return text;
    }

    return "All";
  }

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <h4>Overall score</h4>
      </div>
      <div className="col-12 text-center text-white">
        <h3>{getOverallScoreTextValue()}</h3>
      </div>
      <div className="col">
    	  <input
          className="w-100"
          type="range"
          value={overallMin || 40}
          min="40"
          max={Math.min(94, overallMax)}
          step="1"
          onChange={(v) => onChange(v.target.value, overallMax)}
        >
        </input>

        <input
          className="w-100 text-primary bg-dark"
          type="range"
          value={overallMax || 94}
          min={Math.max(40, overallMin)}
          max="94"
          step="1"
          onChange={(v) => onChange(overallMin, v.target.value)}
        >
        </input>
      </div>
    </div>
  );
};

export default ControllerOverallScore;