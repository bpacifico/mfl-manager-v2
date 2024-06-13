export function jsonToParams(params) {
  var paramString = "";

  Object.keys(params).forEach((k) => {
    if (params[k]) {
      if (paramString.length > 0) {
        paramString += ",";
      }

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