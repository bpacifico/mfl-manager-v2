export function jsonToParams(params) {
  var paramString = "";

  Object.keys(params).forEach((k) => {
    if (paramString.length > 0) {
      paramString += ",";
    }

    if (params[k]) {
      paramString += `${k}: `;

      if (!Array.isArray(params[k])) {
        if (typeof params[k] === "number") {
          paramString += params[k];
        } else {
          paramString += `"${params[k]}"`;
        }
      } else {
        paramString += `[${params[k].join(",")}]`;
      }
    } else {
      paramString += `${k}: ${null}`;
    }
  })

  return paramString;
}

export function prettifyId(id) {
  if (id && id.length === 24) {
    return id.slice(0, 2) + "..." + id.slice(-5);
  }

  return "None";
}