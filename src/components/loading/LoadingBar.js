import React from 'react';

interface LoadingBarProps {
	value?: number;
	total?: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ value, total }) => {

	const getProgressValue = () => {
		if (!value || !total) {
			return 5;
		}

		return value / total * 100;
	}

	const getProgressText = () => {
		if (!value || !total) {
			return "? / ?";
		}

		return value + " / " + total;
	}

  return (
    <div className="progress mb-5">
	    <div
	      className="progress-bar progress-bar-striped bg-info progress-bar-animated"
	      role="progressbar"
	      style={{ width: getProgressValue() + "%" }}
	      aria-valuenow={getProgressValue() + ""}
	      aria-valuemin="0"
	      aria-valuemax="100"
	      >
	      {getProgressText()}
	    </div>
	  </div>
  );
};

export default LoadingBar;