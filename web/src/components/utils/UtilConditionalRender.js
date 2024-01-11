import React from 'react';

interface UtilConditionalRenderProps {
	value: Object;
	okRender: Object;
	emptyRender: Object;
	undefinedRender: Object;
}

const UtilConditionalRender: React.FC<UtilConditionalRenderProps> = ({ value, okRender, emptyRender, undefinedRender }) => {
  if (value) {
  	if (value.length === 0) {
  		return emptyRender;
  	}

  	return okRender;
  }

  return undefinedRender;
};

export default UtilConditionalRender;