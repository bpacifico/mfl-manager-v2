
export const isLocalEnv = () => {
	return window.location.hostname === "localhost"
		|| window.location.hostname === "127.0.0.1"
		|| window.location.hostname === "";
}

export const getMflApiEndpoint = () => {
	return "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/";
}

export const getApiEndpoint = () => {
	if (isLocalEnv()) {
		return "http://127.0.0.1:5000/";
	}
	//return "https://api." + window.location.hostname.replace("www.", "") + "/";
	return "https://api.mflmanager.fr/";
}

export const getGraphQLEndpoint = () => {
	return getApiEndpoint() + "graphql";
}

