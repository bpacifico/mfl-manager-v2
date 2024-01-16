
export function jsonToParams(params) {
	var paramString = "";

  Object.keys(params).forEach((k) => {
  	if (params[k]) {
	  	if (paramString.length > 0) {
	  		paramString += ",";
	  	}

	  	paramString += `${k}: `;

	  	if (typeof params[k] === "number") {
	  		paramString += params[k];
	  	} else {
	  		paramString += `"${params[k]}"`;
	  	}
	  }
  })

  return paramString;
}
